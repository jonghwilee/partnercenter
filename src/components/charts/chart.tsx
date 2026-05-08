import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";
import { cn } from "../../lib/utils";

type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

type ChartContainerProps = {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
};

const ChartContext = React.createContext<ChartConfig | null>(null);

function ChartContainer({ config, className, children }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={config}>
      <div
        className={cn(
          "rounded-lg border border-border bg-background p-3 shadow-sm",
          className
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartTooltip() {
  const config = React.useContext(ChartContext);

  return (
    <RechartsTooltip
      contentStyle={{
        borderRadius: 12,
        border: "1px solid hsl(214 32% 91%)",
        background: "white",
        boxShadow:
          "0 1px 2px rgba(15, 23, 42, 0.08), 0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
      labelStyle={{ fontWeight: 600 }}
      formatter={(value: number, name: string) => {
        const label = config?.[name]?.label ?? name;
        return [value.toLocaleString(), label];
      }}
    />
  );
}

function ChartLegend({ className }: { className?: string }) {
  const config = React.useContext(ChartContext);

  return (
    <RechartsLegend
      verticalAlign="bottom"
      align="left"
      formatter={(value: string) => config?.[value]?.label ?? value}
      wrapperStyle={{ paddingTop: 12 }}
      className={cn("text-xs text-muted-foreground", className)}
    />
  );
}

export { ChartContainer, ChartTooltip, ChartLegend };

