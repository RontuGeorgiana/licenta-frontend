import { Accordion, AccordionSummary, Typography } from "@mui/material"

//TODO: add folder rows for space screen
const FolderRow = ({folder}:any) => {
    console.log(folder)
    return(<>
        {folder.children !== null && folder?.children?.length > 0  && 
                <Accordion>
                    <AccordionSummary>
                    <Typography>{folder?.name}</Typography>
                    </AccordionSummary>
                </Accordion>
            }
    </>    
    )
} 

export default FolderRow