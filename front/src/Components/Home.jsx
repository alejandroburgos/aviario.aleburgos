import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Divider, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  ChatOutlined,
  StarsOutlined,
  StarsTwoTone,
  StarTwoTone,
  Star,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { ListsUser } from "./ProductLists/ListsUser";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newestLists, setNewestLists] = useState();
  const [keywords, setKeywords] = useState("pokemon");

  useEffect(() => {
    const url = `https://api.wallapop.com/api/v3/general/search?keywords=${keywords}&filters_source=search_box&latitude=36.64207&longitude=-4.69118&order_by=newest`;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setNewestLists(json);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log("error", error);
      }
    };
    setInterval(() => {}, 30000);
    fetchData();
  }, []);

  /********************************************* */

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //   order newestLists by date
  const newestListsByDate =
    newestLists &&
    newestLists.search_objects
      .sort((a, b) => {
        return new Date(b.modification_date) - new Date(a.modification_date);
      })
      .slice(0, 40);

  let navigate = useNavigate();

  return (
    <>
      <div className="p-4" style={{ overflow: "scroll" }}>
        <TextField
          className="mb-2"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscador ... "
        />

        <div className="p-3 d-flex justify-content-center">
          <Grid container spacing={0}>
            {newestListsByDate &&
              newestListsByDate.map((wallapopNew, i) => {
                //  get date from wallapopNew.modification_date
                const date = new Date(wallapopNew.modification_date).toString();

                // compare and substract minutes from date
                const dateMinutes = new Date(date).getMinutes();
                const dateHours = new Date(date).getHours();
                const dateDay = new Date(date).getDate();
                const dateMonth = new Date(date).getMonth();
                const dateYear = new Date(date).getFullYear();
                const dateTime = `${dateHours}:${dateMinutes}`;
                const dateDate = `${dateDay}/${dateMonth}/${dateYear}`;
                const dateFull = `${dateDate} ${dateTime}`;

                // max description characters
                const description = wallapopNew.description;
                const descriptionMax = description.substring(0, 100);
                const descriptionMin = description.substring(
                  100,
                  description.length
                );
                const descriptionFinal = `${descriptionMax}`;
                return (
                  <>
                    <Grid item lg={4} className="p-1">
                      <Card
                        className="d-flex flex-column card-box text-center"
                        style={{ height: "400px" }}
                      >
                        <div className="card-tr-actions">
                          <Button
                            className="btn-link p-0 font-size-xl"
                            variant="text"
                          >
                            <p className="text-black-50 font-size-sm mb-0">
                              {dateTime}
                            </p>{" "}
                          </Button>
                        </div>
                        <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="card-img-wrapper card-box-hover rounded"
                          >
                            <img
                              alt="..."
                              className="card-img-top rounded-sm"
                              src={wallapopNew.images[0].xsmall}
                              style={{ width: 100 }}
                            />
                          </a>
                        </Card>
                        <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                          <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                            {wallapopNew.title}
                          </h6>
                          <p className="text-black-50 font-size-sm mb-0">
                            {descriptionFinal}
                          </p>
                        </div>

                        <div className="pb-3">
                          <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                            {wallapopNew.price}€
                          </div>
                        </div>

                        <div className="divider w-50 mx-auto" />
                        <ListsUser wallapopProducts={wallapopNew} index={i}/>
                        <div className="py-2 d-flex align-items-center justify-content-center">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="m-2 d-20 rounded-circle btn-swatch bg-danger"
                          >
                            &nbsp;
                          </a>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="m-2 d-20 rounded-circle btn-swatch bg-first"
                          >
                            &nbsp;
                          </a>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="m-2 d-20 rounded-circle btn-swatch bg-warning"
                          >
                            &nbsp;
                          </a>
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="m-2 d-20 rounded-circle btn-swatch bg-deep-blue"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="divider w-50 mx-auto" />

                        <div className="py-3">
                          <Button className="btn-success text-uppercase font-weight-bold font-size-xs">
                            Comprar
                          </Button>
                        </div>
                      </Card>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </div>
      </div>
    </>
  );
};
