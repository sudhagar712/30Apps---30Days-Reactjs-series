import { Input } from "./ui/input";
import { Button } from "./ui/button";


type Props = {
  mood: string;
  setMood: (value: string) => void;
  onGenerate: () => void;
  disabled: boolean;
};


const MoodInputField = ({ mood, setMood, onGenerate, disabled }: Props) => {
  return (
    <div>
      <Input
        placeholder="Enter your mood (eg:happy, sad, cry)..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />

      <Button
        onClick={onGenerate}
        disabled={disabled}
        className="mt-3 w-full"
      >
        Generate Email Template
      </Button>
    </div>
  );
};

export default MoodInputField;
