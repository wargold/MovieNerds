import {Button, OverlayTrigger, Popover} from 'react-bootstrap'
import history from '../history'

export const NotFound = () =>
    <div>
        <h1 id="pageApiNetError">404... Whoops, page not found!</h1>;
        <Button id="pageNotFound" onClick={() => {
            history.push('/')
        }}>Go Home</Button>
    </div>

export const APIError = () =>
    <div>
        <h1 id="pageApiNetError">404... API ERROR / No Internet Connection!</h1>
        <h3 id="pageApiNetError">Please Check Your Internet Connection!</h3>

        <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popoverHoverFocusAPI}
        >
            <Button id="pageNotFound"
                    onClick={() => {
                        (navigator.onLine ? history.push('/') : history.push('/APIError'))
                    }}>Go Home!</Button>
        </OverlayTrigger>
    </div>;

const popoverHoverFocusAPI = (
    <Popover id="popover-trigger-hover-focus">
        Please Check Your Internet Connection,&nbsp;
        <i>(note: If No Internet Connection You Can't Go Back To The Home Side!)</i>
    </Popover>
);
