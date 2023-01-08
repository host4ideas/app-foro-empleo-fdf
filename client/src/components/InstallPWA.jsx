import React from "react";
import { Button, Modal, Card, CardText, CardBody, CardTitle } from "reactstrap";
import useIosInstallPrompt from "../utils/hooks/useIosInstallPrompt";
import useWebInstallPrompt from "../utils/hooks/useWebInstallPrompt";

export default function InstallPWA() {
    const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
    const [
        webInstallPrompt,
        handleWebInstallDeclined,
        handleWebInstallAccepted,
    ] = useWebInstallPrompt();

    if (!iosInstallPrompt && !webInstallPrompt) {
        return null;
    }

    return (
        <Modal isOpen centered>
            <Card>
                <CardBody>
                    {iosInstallPrompt && (
                        <>
                            <CardText className="text-center">
                                To install this web app on your phone: Open from
                                Safari the share menu
                                <img
                                    src="https://cdn.icon-icons.com/icons2/1097/PNG/512/1485477094-upload_78598.png"
                                    style={{ margin: "auto 8px 8px" }}
                                    alt="Add to homescreen"
                                    width="30"
                                />
                                then &quot;Add to Home Screen&quot;
                            </CardText>
                            <div className="d-flex justify-content-center">
                                <Button onClick={handleIOSInstallDeclined}>
                                    Cancelar
                                </Button>
                            </div>
                        </>
                    )}
                    {webInstallPrompt && (
                        <>
                            <CardText className="text-center">
                                Do you want to install this app?
                            </CardText>
                            <div className="d-flex justify-content-around">
                                <Button
                                    color="success"
                                    onClick={handleWebInstallAccepted}
                                >
                                    Instalar
                                </Button>
                                <Button onClick={handleWebInstallDeclined}>
                                    Cancelar
                                </Button>
                            </div>
                        </>
                    )}
                </CardBody>
            </Card>
        </Modal>
    );
}
