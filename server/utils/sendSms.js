import twilio from 'twilio';
const sendSms = async (body, to) => {
  try {
    const accountSid = process.env.SMS_PROVIDER_SID;
    const authToken = process.env.SMS_PROVIDER_TOKEN;
    const client = twilio(accountSid, authToken);
    if (!body) {
      return false;
    }

    const message = await client.messages
      .create({
        body,
        to,
        from: process.env.SMS_PROVIDER_PH_NO,
      });
    if (!message) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
export default sendSms;