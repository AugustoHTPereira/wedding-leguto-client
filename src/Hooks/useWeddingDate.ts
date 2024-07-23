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

const DATE = new Date(2024, 8, 27, 20, 30);

const useWeddingDate = (): WeddingDate => {
    const [diff, setDiff] = useState<Diff>({} as Diff)

    useEffect(() => {
        setDiff(dateDiff(new Date(), DATE));
        const interval = setInterval(() => {
            setDiff(dateDiff(new Date(), DATE));
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return {
        date: DATE,
        diff,
        dateStr: `${DATE.getDate().toString().padStart(2, '0')}-${(DATE.getMonth() + 1).toString().padStart(2, '0')}-${DATE.getFullYear()}`,
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

export function dateDiff( start: Date, end: Date ): Diff {
    console.log(`Calcular intervalo entre as datas ${start} e ${end}`)

    var msDiff = end.getTime() - start.getTime(); 

    if (isNaN(msDiff))
        return {} as Diff;

    const msInOneDay = 24 * 60 * 60 * 1000;
    const msInOneHour = 60 * 60 * 1000;
    const msInOneMinute = 60 * 1000;
    const msInOneSecond = 1000;

    const diffInDays = Math.floor(msDiff / msInOneDay);
    const diffInHours = Math.floor((msDiff % msInOneDay) / msInOneHour);
    const diffInMinutes = Math.floor((msDiff % msInOneHour) / msInOneMinute);
    const diffInSeconds = Math.floor((msDiff % msInOneMinute) / msInOneSecond);

    const returns = {
        diff: msDiff,
        ms: Math.floor(msDiff % 1000),
        s: diffInSeconds,
        m: diffInMinutes,
        h: diffInHours,
        d: diffInDays,
    };

    return returns;


    // var t = isNaN(  ) ? {} as Diff : {
    //     diff : diff,
    //     ms : Math.floor( diff            % 1000 ),
    //     s  : Math.floor( diff /     1000 %   60 ),
    //     m  : Math.floor( diff /    60000 %   60 ),
    //     h  : Math.floor( diff /  3600000 %   24 ),
    //     d  : Math.floor( diff / 24 * 60 * 60 * 1000        ),
    // };

    // console.log(t);

    // return t;
}

export default useWeddingDate;