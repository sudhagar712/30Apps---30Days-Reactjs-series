
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';


type Props = {
    subject:string,
     footer:string,
    onReset:()=> void,

}



const MoodOutputField = ({subject, footer, onReset}:Props) => {
  return (
    <div>
      <label>Subject:</label>
      <Input
      value={subject}
      readOnly
      />

      <label>Footer</label>
    <Textarea 
      value={footer}
      readOnly
    />

      <Button onClick={onReset} variant="destructive" className='mt-3 w-full'>Reset</Button>
    </div>
  );
}

export default MoodOutputField
