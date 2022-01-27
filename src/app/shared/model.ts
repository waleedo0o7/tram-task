export interface Tram {
    "TransportMode": string,
    "LineNumber": number,
    "Destination": string,
    "JourneyDirection": number,
    "GroupOfLine": string,
    "StopAreaName": string,
    "StopAreaNumber": number,
    "StopPointNumber": number,
    "StopPointDesignation": string,
    "TimeTabledDateTime": string,
    "ExpectedDateTime": string,
    "DisplayTime": string,
    "JourneyNumber": number,
    "Deviations": string
}

export interface VehiclePoints {
    "StatusCode": number,
    "Message": string,
    "ExecutionTime": number,
    "ResponseData": {
        "Trams": Tram[]
    }
}