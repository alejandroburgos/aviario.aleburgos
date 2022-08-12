import React, { useState, useRef } from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    Divider,
    Grid,
} from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
export const ModalEditPhoto = (props) => {

    const inputRef = useRef(null);

    const handleClick = () => {
      // 👇️ open file input box on click of other element
      inputRef.current.click();
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
        props.setImage(await convertToBase64(fileObj))

    // 👇️ reset file input
    event.target.value = null;
  };
  return (
    <>
    <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth={'lg'}>
        <div className="mb-spacing-6">
            <Grid >
                <Grid item xl={12}>
                <input
                                style={{display: 'none'}}
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                            />
                    <Card className="shadow-xxl">
                        <a href="#/" onClick={e => e.preventDefault()} className="card-img-wrapper rounded">
                            <div className="img-wrapper-overlay">

                                <div className="overlay-btn-wrapper">
                                    <Button onClick={() => handleClick()} className="btn-facebook m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg">
                                        <span className="btn-wrapper--icon d-flex">
                                        <Edit />
                                        </span>
                                    </Button>
                                    <Button className="btn-danger m-2 btn-icon hover-scale-lg btn-animated-icon d-50 p-0 border-0 rounded-lg" onClick={(e) => props.setImage('')}>
                                        <span className="btn-wrapper--icon d-flex">
                                            <DeleteOutline />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <img src={props.image} className="card-img-top rounded" alt="..." />
                        </a>
                    </Card>
                </Grid>
            </Grid>
        </div>
        <DialogActions>
            <Button
                onClick={() => props.setOpen(false)}
                variant="contained"
                className="m-2 btn-second"
            >
                Cerrar
            </Button>
        </DialogActions>
        </Dialog>
    </>
           
  )
}
