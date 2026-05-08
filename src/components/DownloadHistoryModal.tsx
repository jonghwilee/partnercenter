interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DownloadHistoryModal({ open, onOpenChange }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="rounded-2xl p-6 w-[480px]"
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold mb-4" style={{ color: "#000000" }}>
          다운로드 이력
        </h2>
        <p className="text-sm" style={{ color: "#676E82" }}>
          다운로드 이력이 없습니다.
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "#F5F6FA", color: "#434343" }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
