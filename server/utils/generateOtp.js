//generate 6 digit otp
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
export default generateOtp;