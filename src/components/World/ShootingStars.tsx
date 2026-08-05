import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Vector3 } from "three";
import type { WorldProps } from "./types";

type Meteor = { delay: number; duration: number; offset: number };

function ShootingStar({ meteor }: { meteor: Meteor }) {
  const group = useRef<Group>(null);
  const points = useMemo(() => [new Vector3(-1.8, 0.65, 0), new Vector3(0, 0, 0)], []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const cycle = (clock.getElapsedTime() - meteor.delay) % meteor.duration;
    const progress = cycle < 0 ? 0 : cycle / meteor.duration;
    const active = progress > 0.08 && progress < 0.34;
    group.current.visible = active;
    if (active) {
      group.current.position.set(-7 + progress * 18, 4.6 - progress * 8 + meteor.offset, -5);
    }
  });
  return <group ref={group} visible={false}><Line points={points} color="#d8e9ff" transparent opacity={0.9} lineWidth={1.2} /></group>;
}

export function ShootingStars({ quality }: WorldProps) {
  const meteors = useMemo(() => [{ delay: 0, duration: 13, offset: 0 }, { delay: 4.2, duration: 17, offset: 1.3 }, { delay: 8.5, duration: 21, offset: -0.8 }], []);
  return <>{meteors.slice(0, quality === "low" ? 1 : 3).map((meteor) => <ShootingStar key={meteor.delay} meteor={meteor} />)}</>;
}
