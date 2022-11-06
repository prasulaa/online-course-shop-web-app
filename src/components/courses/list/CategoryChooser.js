import { List, Box, ListItem, Checkbox, Typography } from "@mui/material";

export default function CategoryChooser(props) {

    return (
        <List sx={{ width: '100%' }}>
            {props.categories.map((category) => {
                return (
                    <Box key={category.id}>
                        <ListItem
                            secondaryAction={
                                <Checkbox
                                    checked={props.checked.includes(category.id)}
                                    edge="end"
                                    onChange={props.handleCategory(category)}
                                />
                            }
                        >
                            <Typography noWrap>
                                {category.name}
                            </Typography>
                        </ListItem>
                        {category.subcategories.length === 0 ? <></> :
                            <Box sx={{ ml: 2 }}>
                                <CategoryChooser
                                    checked={props.checked}
                                    categories={category.subcategories}
                                    handleCategory={props.handleCategory}
                                />
                            </Box>}
                    </Box>
                )
            })}
        </List>
    );
}