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
    const API_URL : string = `http://localhost:8080/create-table`;
    try {

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