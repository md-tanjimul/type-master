import { CheckCircle, Zap } from "lucide-react";
import "./styles.css";
import { cn } from "@/lib/utils";

type HexagonData = {
  speed: number;
  accuracy: number;
};

type HexagonProps = {
  data: HexagonData;
  frontColor?: string;
  bgColor?: string;
  scale?: number;
};

export default function Hexagon({
  data,
  frontColor = "#00f", // default blue
  bgColor = "#ddd",     // default gray
  scale = 0,
}: HexagonProps) {
  const { speed, accuracy } = data;

  if (speed === 0 && accuracy === 0) {
    return (
      <div className="hexagon_wrapper_top flex items-center justify-center shrink-0">
        <div className="blank_hexagon" />
      </div>
    );
  }

  const hexStyles: React.CSSProperties = {
    ["--fillSpeed" as any]: scale,
    ["--fillAccuracy" as any]: accuracy,
    ["--frontFillColor" as any]: frontColor,
    ["--bgFillColor" as any]: bgColor,
  };

  return (
    <div className="hexagon_wrapper_top">
      <div className="hexagon_wrapper">
        <div className={cn("hex")} style={hexStyles}>
          <div className="overlay" />
          <div className="content">
            <div className="flex items-center gap-1">
              <Zap className="scale-80" />
              <p className="text-[120%] font-medium">
                {speed} <span className="text-[50%]">WPM</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="scale-80" />
              <p className="text-[120%] font-medium">
                {accuracy} <span className="text-[50%]">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
