interface SheetReturnType {
    success : boolean
    responseText? : string,
    message? : string
}

interface SheetParameters {
    sheetData : string,
    
}

const submitSheet = async ({ sheetData,  } : SheetParameters) : Promise<SheetReturnType>  => 
{
    try {
        const API_URL : string | undefined = import.meta.env.VITE_API_URL;
        
        if (!API_URL) {
            console.error('API URL Missing ');
            
            throw new Error("Server Not responding")
        }

        if (!sheetData)
        {
            return {
                success : false,
                message : 'No Input'
            }
        }

        const resp : Response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: sheetData,
            })
        });

        const data = await resp.json()

        return {
            success : data?.success,
            responseText : data.responseText
        }

        
    } catch (error : any) {
        
        return {
            success : false,
            message : error.message
        }
    }
}

export default submitSheet