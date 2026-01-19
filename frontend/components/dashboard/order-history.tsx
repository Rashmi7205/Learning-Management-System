"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { Download, AlertCircle } from "lucide-react";
import Link from "next/link";

interface OrderHistoryProps {
  orders: Order[];
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-50 text-yellow-700" },
  processing: {
    label: "Processing",
    color: "bg-blue-50 text-blue-700",
  },
  paid: { label: "Paid", color: "bg-emerald-50 text-emerald-700" },
  failed: { label: "Failed", color: "bg-red-50 text-red-700" },
  cancelled: { label: "Cancelled", color: "bg-gray-50 text-gray-700" },
  refunded: { label: "Refunded", color: "bg-purple-50 text-purple-700" },
};

const refundStatusConfig: Record<string, { label: string; color: string }> = {
  none: { label: "None", color: "bg-gray-50 text-gray-700" },
  requested: { label: "Requested", color: "bg-yellow-50 text-yellow-700" },
  approved: { label: "Approved", color: "bg-blue-50 text-blue-700" },
  rejected: { label: "Rejected", color: "bg-red-50 text-red-700" },
  processed: { label: "Processed", color: "bg-emerald-50 text-emerald-700" },
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-muted-foreground text-center">
          No purchase history yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const statusConfig_item = statusConfig[order.status] || {
          label: order.status,
          color: "bg-gray-50 text-gray-700",
        };
        const refundStatus = refundStatusConfig[order.refund.status] || {
          label: order.refund.status,
          color: "bg-gray-50 text-gray-700",
        };

        return (
          <Card key={order._id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    {order.courseSnapshot.title}
                  </h4>
                  <Badge className={statusConfig_item.color}>
                    {statusConfig_item.label}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Order: {order.orderNumber}</p>
                  <p>
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Refund Info */}
                {order.refund.status !== "none" && (
                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <Badge className={refundStatus.color}>
                      Refund: {refundStatus.label}
                    </Badge>
                    {order.refund.amount && (
                      <span className="text-amber-600 font-medium">
                        ${order.refund.amount.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Amount & Actions */}
              <div className="text-right space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold text-foreground">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>

                {order.invoiceUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={order.invoiceUrl} target="_blank">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
