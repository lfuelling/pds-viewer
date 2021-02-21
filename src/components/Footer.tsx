import React, {FunctionComponent, useEffect, useState} from 'react';
import {Row} from "react-bootstrap";

type Props = {
    cached: boolean,
}

const Footer: FunctionComponent<Props> = ({cached}: Props) => {
    const [localStorageSize, setLocalStorageSize] = useState('');

    useEffect(() => {
        setLocalStorageSize(bytesToHumanReadable(new Blob(Object.values(localStorage)).size))
    });

    return (
        <Row className={'footer'}>
            <div className="left-side">
                <span>Cache: {localStorageSize}</span>
            </div>
            <div className="right-side">
                {(cached && 'From Cache') || 'From API'}
            </div>
        </Row>
    );
}

const bytesToHumanReadable = (bytes: number, decimals = 1): string => {
    const kb = 1024;

    if (Math.abs(bytes) < kb) {
        return bytes + ' B';
    }

    const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** decimals;

    do {
        bytes /= kb;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= kb && u < units.length - 1);

    return bytes.toFixed(decimals) + ' ' + units[u];
}

export default Footer;
