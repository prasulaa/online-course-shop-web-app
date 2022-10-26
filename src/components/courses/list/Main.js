import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Button, Dialog, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CourseList from "./CourseList";
import Filters from "./Filters";

export default function Main(props) {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({
        title: "",
        categories: [],
        difficulties: [],
        priceMin: '',
        priceMax: '',
        page: 1,
        sort: "ASC"
    });

    const getCoursesParams = () => {
        var params = "?";

        if (filters.title.length !== 0) {
            params += "title=" + filters.title;
        }
        filters.categories.forEach((c) => params += "&category=" + c);
        filters.difficulties.forEach((d) => params += "&difficulty=" + d);
        if (filters.priceMin.length !== 0) {
            params += "&priceMin=" + filters.priceMin;
        }
        if (filters.priceMax.length !== 0) {
            params += "&priceMax=" + filters.priceMax;
        }
        params += "&pageNumber=" + (filters.page - 1);
        params += "&sort=" + filters.sort;

        return params;
    }

    const getCourses = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCourses(response);
            }
        });
        xhr.open('GET', "/courses" + getCoursesParams());
        xhr.send();
    };

    const getCategories = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCategories(response);
            }
        });
        xhr.open('GET', "/categories");
        xhr.send();
    }

    const handleFilters = (filters) => () => {
        handleCloseFilters();
        setFilters(filters);
    }

    const handleOpenFilters = () => {
        setFiltersOpen(true);
    };

    const handleCloseFilters = () => {
        setFiltersOpen(false);
    };

    const handleNextPage = () => {
        setFilters({ ...filters, page: filters.page + 1 })
    }

    const handlePreviousPage = () => {
        if (filters.page - 1 > 0) {
            setFilters({ ...filters, page: filters.page - 1 })
        }
    }

    useEffect(getCourses, [filters]);
    useEffect(getCategories, []);

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", m: 0 }}
            spacing={1}
        >
            <FiltersDialog
                filters={filters}
                categories={categories}
                handleFilters={handleFilters}
                open={filtersOpen}
                onClose={handleCloseFilters}
            />
            <Grid item>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    sx={{ width: '95vw', maxWidth: '500px' }}
                >
                    <Grid item>
                        <Button
                            variant='contained'
                            onClick={handleOpenFilters}
                            sx={{ width: '120px', mr: 2 }}
                        >
                            Filters
                        </Button>
                    </Grid>
                    <Grid item>
                        <PageChooser
                            page={filters.page}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <CourseList courses={courses} />
            </Grid>
        </Grid>
    );
}

function PageChooser(props) {
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <Grid item>
                <IconButton onClick={props.handlePreviousPage}>
                    <ArrowBackIosNew />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant="h5">
                    {props.page}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={props.handleNextPage}>
                    <ArrowForwardIos />
                </IconButton>
            </Grid>
        </Grid>
    );
}

function FiltersDialog(props) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            fullScreen={mobile}
            onClose={props.onClose}
            open={props.open}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Filters
                        filters={props.filters}
                        categories={props.categories}
                        handleFilters={props.handleFilters}
                    />
                </Grid>
            </Grid>
        </Dialog>
    )
}