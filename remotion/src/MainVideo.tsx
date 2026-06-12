import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { springTiming } from "@remotion/transitions";

import { PersistentBackground } from "./components/PersistentBackground";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneToday } from "./scenes/SceneToday";
import { SceneFocus } from "./scenes/SceneFocus";
import { SceneStats } from "./scenes/SceneStats";
import { SceneRewards } from "./scenes/SceneRewards";
import { SceneOutro } from "./scenes/SceneOutro";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <TransitionSeries>
        {/* Scene 1: Intro - 0 to 90 (3s) */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <SceneIntro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        {/* Scene 2: Today - 90 to 210 (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneToday />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 25, stiffness: 180 }, durationInFrames: 24 })}
        />

        {/* Scene 3: Focus - 210 to 330 (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneFocus />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 25, stiffness: 180 }, durationInFrames: 24 })}
        />

        {/* Scene 4: Stats - 330 to 510 (6s) */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <SceneStats />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        {/* Scene 5: Rewards - 510 to 660 (5s) */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneRewards />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })}
        />

        {/* Scene 6: Outro - 660 to 720 (2s) */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
