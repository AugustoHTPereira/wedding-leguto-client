import { useEffect, useState } from "react";

interface WeddingDate {
    date: Date,
    diff: Diff,
    dateStr: string,
    str: string,
}

const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

const DATE = new Date(2024, 9, 27, 20);

const useWeddingDate = (): WeddingDate => {
    const [diff, setDiff] = useState<Diff>({} as Diff)

    useEffect(() => {
        setDiff(dateDiff(new Date().toString(), DATE.toString()));
        const interval = setInterval(() => {
            setDiff(dateDiff(new Date().toString(), DATE.toString()));
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return {
        date: DATE,
        diff,
        dateStr: `${DATE.getDate().toString().padStart(2, '0')}.${(DATE.getMonth()).toString().padStart(2, '0')}.${DATE.getFullYear().toString().substring(2)} - ${DATE.getHours()}H`,
        str: `${DATE.getDate().toString().padStart(2, '0')} de ${MONTHS[DATE.getMonth() - 1].toLowerCase()} de ${DATE.getFullYear()}`
    };
}

interface Diff {
    ms: number,
    s: number,
    m: number,
    h: number,
    d: number,
    diff: number,
}

export function dateDiff( str1: string, str2: string ): Diff {
    var diff = Date.parse( str2 ) - Date.parse( str1 ); 
    return isNaN( diff ) ? {} as Diff : {
        diff : diff,
        ms : Math.floor( diff            % 1000 ),
        s  : Math.floor( diff /     1000 %   60 ),
        m  : Math.floor( diff /    60000 %   60 ),
        h  : Math.floor( diff /  3600000 %   24 ),
        d  : Math.floor( diff / 86400000        ),
    };
}

export default useWeddingDate;