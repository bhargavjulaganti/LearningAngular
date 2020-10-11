export interface GetPatientPersonalData {
    resourceType: string;
    entry: Array<PatientMetaData>;
}

export class PatientMetaData {
    fullUrl: string;
}

export interface WeightNotes {
    authorString: string;
    time: string;
    text: string
}

export interface postbody {
    resourceType: string;
    id: string;
    meta: any;
    status: string;
    category: any;
    code: any;
    subject: any;
    effectiveDateTime: any;
    issued: any;
    valueString: any;
    note: Array<WeightNotes>;
}

