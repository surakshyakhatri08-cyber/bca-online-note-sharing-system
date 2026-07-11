import express, { Application, Request, Response } from 'express';


const PORT = 8000;
const app: Application = express();

app.use(express.json());

//health route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "server is up and running",
        status: "success",
        success: true,
        data: null,
    });
});

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`);
    console.log("Press ctrl+c for close the server");
});