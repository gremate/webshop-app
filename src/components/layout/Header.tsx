import '../../styles/header.scss';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppState } from '../../contexts/AppContext';

export default function Header(): JSX.Element {
    const appState = useAppState();
    const dispatch = useAppDispatch();

    return (
        <header className="py-2">
            <Container>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Link to="/" className="fs-2">
                            Webshop App
                        </Link>
                    </Col>
                    <Col xs="auto" className="ms-auto">
                        <div className="d-flex fs-4">
                            {appState.user.isAdmin && (
                                <Link to="/admin" className="me-3">
                                    Admin Page
                                </Link>
                            )}
                            <div className="me-3">
                                <FormControlLabel
                                    label="Admin"
                                    control={
                                        <Switch
                                            checked={appState.user.isAdmin}
                                            onChange={event =>
                                                dispatch({
                                                    type: 'set_user',
                                                    payload: { ...appState.user, isAdmin: event.target.checked }
                                                })
                                            }
                                        />
                                    }
                                    classes={{ label: 'fs-4' }}
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUser} className="me-1" />
                                {appState.user.name}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}
