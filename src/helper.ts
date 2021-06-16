'use strict';

export class Helper {


    static extract(obj: any, path: string): any {

        const regex = /[{]/;
        if (regex.exec(path) === null) {

            if (path.indexOf('.') === -1) {
                return obj[path];
            }

            let splitPath = path.split('.');

            if (splitPath.length === 2) {

                return obj[splitPath[0]][splitPath[1]];

            }

            var result = obj;
            splitPath.forEach(index => {
                result = result[index];
            });

            if (result === undefined) {
                throw new Error("The given path does not exist");
            }

            return result;

        }

        let tokens = path.split('.');
        let keyObject = 'keyObject';
        var testResult = {keyObject : [obj]};

        tokens.forEach(token => {

            var next = [];

            for (let [keyItem, item] of Object.entries(testResult.keyObject)) {

                for (let [key, value] of Object.entries(item)) {

                    switch (token) {

                        case '{n}':

                            if (Number.isFinite(key)) {
                                next.push(value);
                            }
                            break;

                        case '{s}':

                            if (typeof key === 'string') {
                                next.push(value);
                            }
                            break;

                        default:
                            if (token === key) {
                                next.push(value);
                            }
                            break;
                    }

                }

            }

            testResult.keyObject = next;

        });

        return testResult.keyObject;

    }


}