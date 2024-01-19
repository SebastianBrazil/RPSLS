namespace RPSLS.Services.rpslsRandomGen;

public class rpslsRandomGenService : IrpslsRandomGenService
{
    public string ResponseRNG()
    {
        Random rNumber = new Random();
        int bobbert = rNumber.Next(0,5);

        string[] choices = new string[5];
        choices[0] = "Rock";
        choices[1] = "Paper";
        choices[2] = "Scissors";
        choices[3] = "Lizard";
        choices[4] = "Spock";

        return choices[bobbert];
    }
}
