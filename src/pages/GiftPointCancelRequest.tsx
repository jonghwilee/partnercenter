import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { giftPointOrders } from "../data/mockData";

const cancellableOrders = giftPointOrders.filter(
  (o) => o.status !== "취소" && o.status !== "완료"
);

export default function GiftPointCancelRequest() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const selectedOrder = selectedOrderId
    ? giftPointOrders.find((o) => o.id === selectedOrderId)
    : null;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>취소 요청</CardTitle>
          <CardDescription>
            주문 취소를 요청할 수 있습니다. 요청 후 담당자 검토를 거쳐 처리됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-3 text-sm font-medium">주문 선택</h4>
            <div className="space-y-2">
              {cancellableOrders.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  취소 요청 가능한 주문이 없습니다.
                </p>
              ) : (
                cancellableOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left transition-colors ${
                      selectedOrderId === order.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.productName} · {order.quantity}개 · {order.amount.toLocaleString()}원
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.orderDate}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {selectedOrder && (
            <>
              <div>
                <h4 className="mb-3 text-sm font-medium">취소 사유 입력</h4>
                <textarea
                  placeholder="취소 사유를 입력해 주세요."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <Button
                className="w-full"
                disabled={!cancelReason.trim()}
              >
                취소 요청
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        ※ 취소 요청은 즉시 반영되지 않으며, 담당자 검토 후 처리됩니다.
      </p>
    </div>
  );
}
