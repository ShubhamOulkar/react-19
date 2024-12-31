import { ProfilerOnRenderCallback } from "react";

export const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  // Aggregate or log render timings...
  console.log("useActionState profiler data:", {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};
