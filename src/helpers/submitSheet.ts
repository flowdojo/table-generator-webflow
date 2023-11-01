interface SheetReturnType {
    success : boolean
    responseText? : string,
    message? : string
}

interface SheetParameters {
    sheetData : string,
    
}

const submitSheet = async ({ sheetData } : SheetParameters) : Promise<SheetReturnType>  => 
{
    try {
        const API_URL : string | undefined = import.meta.env.VITE_API_URL;
        
        if (!API_URL) {
            console.error('API URL Missing ');
            
            throw new Error("Server Not responding")
        }

        if (!sheetData) throw new Error("No Input received")

        const resp : Response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: sheetData
            })
        });

        const data = await resp.json()

        console.log("data ", data);
        
        if (!data.success) throw new Error(data.error)
        
        return {
            success : data?.success,
            responseText : data.responseText
        }

        
    } catch (error : any) {
        console.log("ERRRRR ", error.message);
        
        return {
            success : false,
            message : error.message
        }
    }
}

export default submitSheet