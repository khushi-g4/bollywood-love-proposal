export default function Sky() {
  return (
    <>
      {/* Deep Space */}
      <color attach="background" args={["#020617"]} />

      {/* Very soft blue fog for depth */}
      <fog attach="fog" args={["#020617", 12, 35]} />
    </>
  );
}