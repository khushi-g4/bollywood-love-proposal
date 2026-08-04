export default function Stars() {
  const stars = Array.from({ length: 180 });

  return (
    <>
      {stars.map((_, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white opacity-80"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
        />
      ))}
    </>
  );
}