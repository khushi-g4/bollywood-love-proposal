import { BackSide } from "three";

const vertexShader = `varying vec3 vDirection; void main() { vDirection = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const fragmentShader = `
  varying vec3 vDirection;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) { vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
  void main() {
    float vertical = smoothstep(-0.65, 0.92, vDirection.y);
    vec3 midnight = mix(vec3(0.002, 0.007, 0.021), vec3(0.012, 0.042, 0.105), vertical);
    float atmosphericNoise = noise(vDirection.xz * 8.0 + vDirection.y * 3.0) * 0.009;
    float diagonal = vDirection.x * 0.82 - vDirection.y * 0.55 + 0.05;
    float milkyBand = exp(-diagonal * diagonal * 19.0);
    float grain = noise(vDirection.xy * 120.0) * noise(vDirection.yz * 90.0);
    vec3 milkyWay = vec3(0.19, 0.30, 0.52) * milkyBand * (0.045 + grain * 0.09);
    gl_FragColor = vec4(midnight + atmosphericNoise + milkyWay, 1.0);
  }
`;

export function Sky() {
  return <mesh><sphereGeometry args={[80, 48, 48]} /><shaderMaterial side={BackSide} vertexShader={vertexShader} fragmentShader={fragmentShader} depthWrite={false} /></mesh>;
}
