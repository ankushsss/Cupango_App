import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import { v4 as uuidv4 } from "uuid";
// data
import mock from "../dashboard/mock";
import axios from "axios";
import { UserStateContext } from "../../context/UserContext";
import { ItemContext } from "../../context/ItemContext";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  media: {
    height: 140,
  },
}));

export default function ItemsRedux({ component: Component, ...rest }) {
  const classes = useStyles();
  const { isAuthenticated, admins } = useContext(UserStateContext);
  const { dispatch, getAllMenu } = useContext(ItemContext);
  const history = useHistory();

  const [menu, setMenu] = useState({
    item_name: "",
    image_url: "",
    description: "",
    items_price: "",
    sizes: [{ name: "", additional_price: "" }],
    additions: [
      {
        addition_name: String,

        addition_image: "",
        price: "",

        min_number: "",
        max_number: "",
      },
    ],
  });

  const [size, setSize] = useState([]);
  const [sizeName, setSizeName] = useState();
  const [additional_price, setAdditional_price] = useState();

  const [addonName, setAddonName] = useState();
  const [addonImage, setAddonImage] = useState();
  const [addonPrice, setAddonPrice] = useState();
  const [addonMinNo, setAddonMinNo] = useState();
  const [addonMaxNo, setAddonMaxNo] = useState();

  const [progress, setProgress] = useState(0);

  const [isSubscribed, setSubscribed] = useState(true);
  const [isItemOpen, setIsItemOpen] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setMenu({ ...menu, [name]: value });
    // console.log(subadmins)
  };

  const createItem = (e) => {
    e.preventDefault();
    console.log(menu);
    setIsFetching(true);
    setErrors(false);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const AllItem = getAllMenu();
      const { data } = axios.post(
        "/api/v1/additem",
        { AllItem, restId: admins },
        config,
      );
      setIsFetching(false);

      alert("Item added Successfully");
      setMenu({
        item_name: "",
        image_url: "",
        description: "",
        items_price: "",
        sizes: [],
        additions :[]
      });
    } catch (err) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (admins) {
      console.log(admins);
    }
  }, [admins]);

  console.log(getAllMenu());
  return (
    <>
      <PageTitle title="Items" />
      <Button
        variant="contained"
        size="medium"
        color="secondary"
        onClick={() => {
          setIsItemOpen(!isItemOpen);
          setMenu({
            item_name: "",
            image_url: "",
            description: "",
            items_price: "",
            sizes: [],
            additions :[]
          });
        }}
      >
        Add Item
      </Button>
      <br></br>

      {isItemOpen ? (
        <Grid item xs={12} md={12}>
          <Widget title="Add Items" disableWidgetMenu>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="item_name"
              value={menu?.item_name}
              onChange={handleChange}
              margin="normal"
              placeholder="item_name"
              type="text"
              fullWidth
            />

            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="image_url"
              value={menu?.image_url}
              onChange={handleChange}
              margin="normal"
              placeholder="image_url"
              type="text"
              fullWidth
            />

            <TextField
              id="description"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="description"
              value={menu?.description}
              onChange={handleChange}
              margin="normal"
              placeholder="description"
              type="text"
              fullWidth
            />

            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="items_price"
              value={menu?.items_price}
              onChange={handleChange}
              margin="normal"
              placeholder="items_price"
              type="text"
              fullWidth
            />

            <Grid item xs={12} md={12}>
              <Widget title="Add Size" disableWidgetMenu>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="name"
                  // value={menu.sizes?.sizeName}
                  onChange={(e) => {
                    setSizeName(e.target.value);
                  }}
                  margin="normal"
                  placeholder="name"
                  type="text"
                  fullWidth
                />

                <TextField
                  id="additional_price"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="additional_price"
                  // value={menu.sizes?.additional_price}
                  onChange={(e) => {
                    setAdditional_price(e.target.value);
                  }}
                  margin="normal"
                  placeholder="additional_price"
                  type="text"
                  fullWidth
                />

                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={(e) => {
                    menu.sizes?.push({
                      name: sizeName,
                      additional_price: additional_price,
                    });
                  }}
                >
                  Add Size
                </Button>
                {menu.sizes?.map((e) => (
                  <p>{e.name}</p>
                ))}
              </Widget>
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12} md={12}>
              <Widget title="Add AddOns" disableWidgetMenu>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="name"
                  // value={menu.sizes?.sizeName}
                  onChange={(e) => {
                    setAddonName(e.target.value);
                  }}
                  margin="normal"
                  placeholder="name"
                  type="text"
                  fullWidth
                />

                <TextField
                  id="Image"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="Image"
                  // value={menu.sizes?.additional_price}
                  onChange={(e) => {
                    setAddonImage(e.target.value);
                  }}
                  margin="normal"
                  placeholder="Image"
                  type="text"
                  fullWidth
                />

                <TextField
                  id="Price"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="Price"
                  // value={menu.sizes?.additional_price}
                  onChange={(e) => {
                    setAddonPrice(e.target.value);
                  }}
                  margin="normal"
                  placeholder="Price"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="MinNo"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="MinNo"
                  // value={menu.sizes?.additional_price}
                  onChange={(e) => {
                    setAddonMinNo(e.target.value);
                  }}
                  margin="normal"
                  placeholder="Min No "
                  type="text"
                  fullWidth
                />
                <TextField
                  id="MaxNo"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  name="MaxNo"
                  // value={menu.sizes?.additional_price}
                  onChange={(e) => {
                    setAddonMaxNo(e.target.value);
                  }}
                  margin="normal"
                  placeholder="Max No"
                  type="text"
                  fullWidth
                />

                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={(e) => {
                    console.log(menu?.additions)
                    menu.additions?.push({
                      item_name: addonName,
                      addition_image: addonImage,
                      price: addonPrice,
                      min_number: addonMinNo,
                      max_number: addonMaxNo,
                    });
                  }}
                >
                  Add Addon
                </Button>
                {menu.additions?.map((e) => (
                  <p>{e.item_name}</p>
                ))}
              </Widget>
            </Grid>
            <br></br>
            <br></br>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={(e) => {
                // console.log(menu)
                dispatch({ type: "FETCH_SUCCESS", payload: menu });
              }}
              //   onClick={createItem}
            >
              Add Item
            </Button>
            <br></br>
            <br></br>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={createItem}
              //
            >
              Add
            </Button>
          </Widget>
        </Grid>
      ) : null}
    </>
  );
}
