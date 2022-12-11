import { Checkbox, List, ListItem, Typography } from "@mui/material";

export default function Difficulties(props) {

    return (
        <List sx={{ width: '100%' }}>
            {[{ id: 0, name: "Easy" }, { id: 1, name: "Medium" }, { id: 2, name: "Hard" }].map((dif) => {
                return (
                    <ListItem
                        key={dif.id}
                        secondaryAction={
                            <Checkbox
                                checked={props.checked.includes(dif.id)}
                                edge="end"
                                onChange={props.handleDifficulty(dif)}
                            />
                        }>
                        <Typography noWrap>
                            {dif.name}
                        </Typography>
                    </ListItem>
                )
            })}
        </List>
    );
}