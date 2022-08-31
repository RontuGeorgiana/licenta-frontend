import { Avatar, Box, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { formatDate, getInitials } from "../utils/utils";

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        commentContainer:{
            boxShadow: `-1px 2px 2px -1px ${theme.palette.primary.dark} !important`,
            padding:'0 4px',
            borderRadius:'4px'
        },
        commentHeader:{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:'4px 0',
            borderBottom: `1px solid ${theme.palette.primary.light}`
        },
        headerActions:{
            display: "flex",
            alignItems: 'center',
        },
        poster: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'start',
        },
        posterAvatar:{
            backgroundColor: `${theme.palette.secondary.light} !important`,
            color: theme.palette.secondary.contrastText,
            width: '1.3rem !important',
            height: '1.3rem !important',
            fontSize: '0.7rem !important',
            marginRight: '4px'
        },
        commentContent: {
            padding:'4px 0'
        }
    })
)

const Comment= ({comment} :any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return(
        <Box className={classes.commentContainer}>
            <div className={classes.commentHeader}>
                <div className={classes.poster}>
                    <Avatar className={classes.posterAvatar}>{ getInitials(`${comment.user.firstName} ${comment.user.lastName}`) }</Avatar>
                    <Typography variant='caption' color='InfoText'>{comment.user.firstName} {comment.user.lastName}</Typography>
                </div>
                <div className={classes.headerActions}>
                    <Typography variant='caption'>{formatDate(comment.createdOn)}</Typography>
                    {/* {comment?.deletable &&
                        <IconButton>
                            <Delete />
                        </IconButton>
                    } */}
                </div>
            </div>
            <div className={classes.commentContent}>
                <Typography variant='body2' color='InfoText'>{comment.text}</Typography>
            </div>
        </Box>
    )
}

export default Comment