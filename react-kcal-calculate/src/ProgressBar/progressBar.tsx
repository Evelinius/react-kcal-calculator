import React from 'react';
import './progressBar.css';

export interface ProgressItem {
    value: number;
    color: string;
}

interface Props {
    progress: ProgressItem[];
    showPercents: boolean;
}

export function Progress(props: Props) {

    const sum = props.progress.map(p => p.value).reduce((sum, cur) => sum + cur, 0);
    return (
        <div>
            <div className={`progress ${sum > 100 ? 'border-red' : 'border-black'}`}>
                {props.progress.map(p => <div className="progress-item" style={{ width: `${p.value}%`, backgroundColor: p.color }} />)}
            </div>
            <div>
                {props.showPercents && `${sum}%`}
            </div>
        </div>
    )
}