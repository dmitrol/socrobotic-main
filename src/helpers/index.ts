import { watch } from 'vue'
import axios from 'axios'

export function startWatch(fields: object, code: string) {
    for (let index in fields) {
        const fieldItem = index.toString()
        watch(
            () => fields[fieldItem],
            async (val) => {
                try {
                    await axios.post('setting/set', { code: code, key: fieldItem, value: val })
                } catch (error) {
                    console.log(error)
                }
            },
            { deep: true },
        )
    }
}

export function setFields(fields: object, obj: object) {
    for (let key in obj) {
        fields[key] = obj[key]
    }
}
