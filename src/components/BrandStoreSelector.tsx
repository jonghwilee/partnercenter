interface Props {
  triggerClassName?: string;
}

export default function BrandStoreSelector({ triggerClassName }: Props) {
  return (
    <button
      className={triggerClassName}
      style={{
        border: "1px solid #D8DCE5",
        borderRadius: 8,
        padding: "0 12px",
        fontSize: 14,
        color: "#434343",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
      }}
    >
      전체 브랜드 · 매장
    </button>
  );
}
