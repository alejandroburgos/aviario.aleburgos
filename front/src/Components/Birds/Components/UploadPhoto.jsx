import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    Divider,
    Grid,
    List,
    ListItem,
    Slide,
    Table,
    TextField,
    Tooltip,
} from "@material-ui/core";
import Dropzone, { useDropzone } from "react-dropzone";

import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import PublishTwoToneIcon from "@material-ui/icons/PublishTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import CheckIcon from "@material-ui/icons/Check";
import { AddAPhoto, CloudUploadTwoTone } from "@material-ui/icons";
import { Alert } from "@mui/material";

export const UploadPhoto = (props) => {

    const [files, setFiles] = useState([]);
    const {isDragActive,
        isDragAccept,
        isDragReject, getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: async (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => 
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            ));
            props.setImage( await convertToBase64(acceptedFiles[0]))
        }
    });

    const thumbs = files.map(file => (
        <Grid item md={3} className="p-2" key={file.name}>
            <div className="p-2 bg-white shadow-xxl border-dark card-box d-flex overflow-hidden rounded-sm">
                <img className="img-fluid img-fit-container rounded-sm" src={file.preview} alt="..." />
            </div>
        </Grid>
    ));

    useEffect(() => () => {
        files.forEach(async(file) => {
            URL.revokeObjectURL(file.preview)
        });
    }, [files]);

    // convert files to base64
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


    return (
        <>
                <Card className="card-box mb-lg-0">
                    <div className="card-header">
                        <div className="card-header--title">
                            <small>Imagenes</small>
                        </div>
                    </div>
                    <div className="p-4">
                        <Grid container spacing={6}>
                            <Grid item lg={12}>
                                <div className="dropzone">
                                    <div {...getRootProps({className: 'dropzone-upload-wrapper'})}>
                                        <input {...getInputProps()} />
                                        <div className="dropzone-inner-wrapper dropzone-inner-wrapper-alt">

                                            {isDragAccept && (
                                                <div>
                                                    <div className="d-100 btn-icon mb-3 hover-scale-rounded bg-success shadow-success-sm rounded-lg text-white">
                                                        <CheckIcon className="d-50" />
                                                    </div>
                                                    <div className="font-size-xs text-success">
                                                        We're ready to start!
                                                    </div>
                                                </div>
                                            )}
                                            {isDragReject && (
                                                <div>
                                                    <div className="d-100 btn-icon mb-3 hover-scale-rounded bg-danger shadow-danger-sm rounded-lg text-white">
                                                        <CloseTwoToneIcon className="d-50" />
                                                    </div>
                                                    <div className="font-size-xs text-danger">
                                                        These files are not images!
                                                    </div>
                                                </div>
                                            )}
                                            {!isDragActive && (
                                                <div>
                                                    <div className="d-90 btn-icon mb-3 hover-scale-rounded bg-white shadow-light-sm rounded-lg text-first">
                                                        <CloudUploadTwoTone className="d-40" />
                                                    </div>
                                                    <div className="font-size-sm">
                                                        Drag and drop images here
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="card-footer p-3 bg-secondary">
                        <div>
                            <div className="font-weight-bold mb-3 text-uppercase text-dark font-size-sm text-center">Uploaded Files</div>
                            {thumbs.length <= 0 &&
                            <div className="text-first text-center font-size-sm">
                                Uploaded demo images previews will appear here!
                            </div>
                            }
                            {thumbs.length > 0 &&

                            <div>
                                <Alert severity="success" className="text-center mb-3">
                                    You have uploaded <b>{thumbs.length}</b> files!
                                </Alert>
                                <Grid container spacing={0}>
                                    {thumbs}
                                </Grid>
                            </div>
                            }
                        </div>
                    </div>
                </Card>
            </>
    );
};
