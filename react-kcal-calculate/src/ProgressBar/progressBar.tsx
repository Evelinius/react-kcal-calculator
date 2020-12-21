import React from 'react';
import './progressBar.css';

export interface ProgressItem {
    value: number;
    color: string;
}

interface Props {
    progress: ProgressItem[];
}

export function Progress(props: Props) {
    return (<div className="progress">
        {props.progress.map(p =>
            <div className='progress-item' style={{ width: `${p.value}%`, backgroundColor: p.color }}>
            </div>
        )}
    </div>)
}