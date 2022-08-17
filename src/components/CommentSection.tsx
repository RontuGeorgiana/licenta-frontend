import { Button, Container, Stack, TextField, Theme, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import Comment from "./Comment";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        commentFieldContainer:{
          padding:'0 !important',
          display: 'flex !important',
          flexDirection: 'column',
          alignItems: 'center',
        },
        commentRoot:{
            width:'100% !important'
        },
        commentField:{
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            fontSize: '0.875rem',
        },
        buttonContainer:{
            display:'flex',
            justifyContent:'end',
            width: '100%',
            marginTop: '4px'
        }
    })
)

const CommentSection = ({comments, taskId, teamId, addComment}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [newComment, setNewComment] = useState('');

    const onAddComment = () => {
        const payload = {
            text: newComment,
            taskId,
            teamId
        };

        addComment(payload);
    }

    return(
        <Stack>
            <Stack>
                {comments?.length > 0 &&
                    comments.map((comment :any) =>{ 
                        return (<Comment comment={comment}/>)
                    })
                }
            </Stack>
            <hr/>
            <Container className={classes.commentFieldContainer}>
                <TextField
                    multiline
                    minRows={4}
                    className={classes.commentRoot}
                    InputProps={{className: classes.commentField}}
                    value={newComment}
                    onChange={(e:any)=>setNewComment(e.target.value)}
                />
                <div className={classes.buttonContainer}>
                    <Button variant='contained' color='secondary' onClick={onAddComment}>
                        Post
                    </Button>
                </div>
            </Container>
        </Stack>
    )
}

export default CommentSection;