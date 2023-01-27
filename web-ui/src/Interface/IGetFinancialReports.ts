interface IReport {
    concept: string,
    unit: string,
    label: string,
    value: number
}

export interface IFinancialReport {
    bs: IReport,
    ic: IReport,
    cf: IReport
}

export interface IGetFinancialReports {
    accessNumber: string,
    symbol: string,
    cik: string,
    year: number,
    quarter: 0,
    form: string,
    startDate: string,
    endDate: string,
    fileDate: string,
    acceptDate: string,
    report: IFinancialReport
}