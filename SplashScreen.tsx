type Props = {
  onComplete?: () => void;
};

export function SplashScreen({ onComplete }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1
        onClick={onComplete}
        style={{ fontSize: "24px", fontWeight: "bold" }}
      >
        Sanjy AI
      </h1>
    </div>
  );
}
