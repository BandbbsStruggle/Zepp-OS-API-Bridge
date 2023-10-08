export
const widget = {
    TEXT: hmUI.widget.TEXT,
    BUTTON: hmUI.widget.BUTTON,
    ARC: hmUI.widget.ARC,
    IMG: hmUI.widget.IMG,
    FILL_RECT: hmUI.widget.FILL_RECT,
    STROKE_RECT: hmUI.widget.STROKE_RECT,
    IMG_ANIM: hmUI.widget.IMG_ANIM,
    CIRCLE: hmUI.widget.CIRCLE,
    QRCODE: hmUI.widget.QRCODE,
    DIALOG: hmUI.widget.DIALOG,
    RADIO_GROUP: hmUI.widget.RADIO_GROUP,
    STATE_BUTTON: hmUI.widget.STATE_BUTTON,
    CHECKBOX_GROUP: hmUI.widget.CHECKBOX_GROUP,
    SLIDE_SWITCH: hmUI.widget.SLIDE_SWITCH,
    HISTOGRAM: hmUI.widget.HISTOGRAM,
    PICK_DAT: hmUI.widget.PICK_DAT,
    // POLYLINE: hmUI.widget.FILL_RECT,
}

export
function createWidget(widgetType, params) {
    const widgetParams = Object.assign({}, params);
    switch (widgetType) {
        case widget.TEXT:
        case widget.BUTTON:
            if (widgetParams.text_i18n) {
                if (widgetParams.text_i18n) {
                    let language;
                    const languageMap = {
                        0: 'zh-CN',
                        1: 'zh-TW',
                        2: 'en-US',
                        3: 'es-ES',
                        4: 'ru-RU',
                        5: 'ko-KR',
                        6: 'fr-FR',
                        7: 'de-DE',
                        8: 'id-ID',
                        9: 'pl-PL',
                        10: 'it-IT',
                        11: 'ja-JP',
                        12: 'th-TH',
                        13: 'ar-EG',
                        14: 'vi-VN',
                        15: 'pt-PT',
                        16: 'nl-NL',
                        17: 'tr-TR',
                        18: 'uk-UA',
                        19: 'iw-IL',
                        20: 'pt-BR',
                        21: 'ro-RO',
                        22: 'cs-CZ',
                        23: 'el-GR',
                        24: 'sr-RS',
                        25: 'ca-ES',
                        26: 'fi-FI',
                        27: 'nb-NO',
                        28: 'da-DK',
                        29: 'sv-SE',
                        30: 'hu-HU',
                        31: 'ms-MY',
                        32: 'sk-SK',
                        33: 'hi-IN',
                    };

                    language = languageMap[hmSetting.getLanguage()] || 'en-US';
                    if (!widgetParams.text_i18n || !widgetParams.text_i18n[language]) widgetParams.text = widgetParams.text_i18n['en-US'];
                    else widgetParams.text = widgetParams.text_i18n[language];
                    delete widgetParams.text_i18n;
                }
            }

            // 设置可见性
            if (widgetParams.visible !== undefined) {
                widgetParams.visible ? widgetParams.alpha = 1 : widgetParams.alpha = 0;
                delete widgetParams.visible;
            }
            widget.setProperty = function(propertyId, val) {
                // 处理 VISIBLE 属性单独设置的情况
                if (propertyId === 'VISIBLE') {
                    widget.style.display = val ? 'block' : 'none';
                    return;
                }

                // 处理 MORE 属性设置的情况
                if (propertyId === 'MORE') {
                    for (const prop in val) {
                        if (val.hasOwnProperty(prop)) {
                            widget.style[prop] = val[prop];
                        }
                    }
                    return;
                }

                // 处理其他属性设置的情况
                widget.style[propertyId.toLowerCase()] = val;
            };

            for (const prop in options) {
                if (options.hasOwnProperty(prop)) {
                    widget.setProperty(prop, options[prop]);
                }
            }
            break;

    }

    return hmUI.createWidget(widgetType, widgetParams);
}
export class Battery {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.BATTERY);
        this.previousMileage0 = null;
        const savedPreviousMileage0 = hmFS.SysProGetChars('previousMileage1');
        if (savedPreviousMileage0 === undefined || savedPreviousMileage0 === null) {
            hmFS.SysProSetChars('previousMileage0', this.sensor.current);
        } else {
            this.previousMileage0 = savedPreviousMileage0;
        }
    }

    getCurrent() {
        return this.sensor.current;
    }
    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage0) {
                callback(this.sensor.current);
                this.previousMileage0 = this.sensor.current;
            }
        }, 1000);
    }
    offChange() {
        clearInterval(this.intervalId);
    }
}
export class HeartRate {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.HEART);
        this.previousMileage6 = null;
        const savedPreviousMileage6 = hmFS.SysProGetChars('previousMileage6');
        if (savedPreviousMileage6 === undefined || savedPreviousMileage6 === null) {
            hmFS.SysProSetChars('previousMileage6', this.sensor.current);
        } else {
            this.previousMileage6 = savedPreviousMileage6;
        }
    }

    getCurrent() {
        return this.sensor.current;
    }
    getLast() {
        return this.sensor.last;
    }
    getToday() {
        return this.sensor.today;
    }
    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage6) {
                callback(this.sensor.current);
                this.previousMileage6 = this.sensor.current;
            }
        }, 60000);
    }
    offChange() {
        clearInterval(this.intervalId);
    }
}
export class FatBurning {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.FAT_BURRING);
        this.previousMileage5 = null;
        const savedPreviousMileage5 = hmFS.SysProGetChars('previousMileage5');
        if (savedPreviousMileage5 === undefined || savedPreviousMileage5 === null) {
            hmFS.SysProSetChars('previousMileage5', this.sensor.current);
        } else {
            this.previousMileage5 = savedPreviousMileage5;
        }
    }

    getCurrent() {
        return this.sensor.current;
    }
    getTarget() {
        return this.sensor.target;
    }
    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage5) {
                callback(this.sensor.current);
                this.previousMileage5 = this.sensor.current;
            }
        }, 60000);
    }
    offChange() {
        clearInterval(this.intervalId);
    }
}
export class BloodOxygen {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.HEART);
        this.intervalId = null;
        this.previousMileage4 = null;

        const savedPreviousMileage4 = hmFS.SysProGetChars('previousMileage4');
        if (savedPreviousMileage4 === undefined || savedPreviousMileage4 === null) {
            hmFS.SysProSetChars('previousMileage4', this.sensor.current);
        } else {
            this.previousMileage4 = savedPreviousMileage4;
        }
    }

    getCurrent() {
        return this.sensor.current;
    }

    start() {
        return this.sensor.start();
    }

    stop() {
        return this.sensor.stop();
    }

    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage4) {
                callback(this.sensor.current);
                this.previousMileage4 = this.sensor.current;
            }
        }, 1000);
    }

    offChange() {
        clearInterval(this.intervalId);
    }

    getLastFewHour(hour) {
        const currentTime = new Date();
        const data = [];

        for (let i = hour - 1; i >= 0; i--) {
            const timestamp = currentTime.getTime() - (i * 60 * 60 * 1000);
            const measurementTime = new Date(timestamp);

            const savedValue = hmFS.SysProGetChars(`measurementData_${measurementTime.getTime()}`);
            const currentValue = this.sensor.current;

            if (savedValue !== undefined && savedValue !== null) {
                data.push({
                    time: measurementTime,
                    value: savedValue,
                });
            } else {
                hmFS.SysProSetChars(`measurementData_${measurementTime.getTime()}`, currentValue);
                data.push({
                    time: measurementTime,
                    value: currentValue,
                });
            }
        }

        data.sort((a, b) => a.time - b.time);

        return data;
    }
}

export class Distance {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.DISTANCE);
        this.intervalId = null;
        this.previousMileage = null;

        const savedPreviousMileage = hmFS.SysProGetChars('previousMileage');
        if (savedPreviousMileage === undefined || savedPreviousMileage === null) {
            hmFS.SysProSetChars('previousMileage', this.sensor.current);
        } else {
            this.previousMileage = savedPreviousMileage;
        }
    }

    getCurrent() {
        return this.sensor.current;
    }

    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage) {
                callback(this.sensor.current);
                this.previousMileage = this.sensor.current;
            }
        }, 1000);
    }

    offChange() {
        clearInterval(this.intervalId);
    }
}


export class Calorie {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.CALORIE);
    }

    getCurrent() {
        return this.sensor.current
    }
    getTarget() {
        return this.sensor.target
    }
}
export class Time {
    constructor() {
        this.sensor = hmSensor.createSensor(hmSensor.id.TIME);
        this.format
        switch (hmSetting.getTimeFormat()) {
            case 0:
                this.format = "TIME_HOUR_FORMAT_12"
                break;
            case 1:
                this.format = "TIME_HOUR_FORMAT_24"
                break;
        }
        this.intervalId = null;
        this.previousMileage2 = null;
        const savedPreviousMileage2 = hmFS.SysProGetChars('previousMileage2');
        if (savedPreviousMileage2 === undefined || savedPreviousMileage2 === null) {
            hmFS.SysProSetChars('previousMileage2', this.sensor.current);
        } else {
            this.previousMileage2 = savedPreviousMileage2;
        }
    }
    getTime() {
        return this.sensor.utc
    }
    getFullYear() {
        return this.sensor.year
    }
    getMonth() {
        return this.sensor.Month
    }
    getDate() {
        return this.sensor.day
    }
    getHours() {
        return this.sensor.hour
    }
    getMinutes() {
        return this.sensor.minute
    }
    getSeconds() {
        return this.sensor.second
    }
    getDay() {
        return this.sensor.week
    }
    getHourFormat() {
        return this.format
    }
    getFormatHour() {
        return this.sensor.format_hour
    }
    onPerMinute(func) {
        timer.createTimer(60000, 60000, func)
    }
    onPerDay() {
        timer.createTimer(3600000, 3600000, func)
    }
    getFestival() {
        return this.sensor.solar_festival
    }
    getLunarYear() {
        return this.sensor.lunar_year
    }
    getLunarMonth() {
        return this.sensor.lunar_month
    }
    getLunarDay() {
        return this.sensor.lunar_day
    }
    getLunarFestival() {
        return this.sensor.lunar_festival
    }
    getSolarTerm() {
        return this.sensor.lunar_solar_term
    }
    getShowFestival() {
        return this.sensor.getShowFestival()
    }
    getLunarMonthCalendar() {
        return this.sensor.getLunarMonthCalendar()
    }
    day_count() {
        let days = 31
        if (this.sensor.month === 2 && leapYear(this.sensor.year)) days = 29
        else if (this.sensor.month === 2) days = 28
        else if (this.sensor.month === 4 || this.sensor.month === 6 || this.sensor.month === 9 || this.sensor.month === 11) days = 30
        return days
    }
    onChange(callback) {
        this.intervalId = setInterval(() => {
            if (this.sensor.current !== this.previousMileage2) {
                callback(this.sensor.current);
                this.previousMileage2 = this.sensor.current;
            }
        }, 1000);
    }

    offChange() {
        clearInterval(this.intervalId);
    }
}
export
function back() {
    hmApp.goBack()
}
export
function home() {
    hmApp.gotoHome()
}
export
function push(page) {
    hmApp.gotoPage({
        url: page.url,
        param: page.params
    });
}

export
function showToast(options) {
    hmUI.showToast({
        text: options.content
    });

}
export
function str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export class LocalStorage {
    constructor(fileName = 'local_storage.txt') {
        this.fileName = fileName;
        this.contentObj = this.get();
    }
    save() {
        const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC);
        const contentBuffer = str2ab(JSON.stringify(this.contentObj));
        hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
        hmFS.close(file);
    }
    get() {
        const [fsStat, err] = hmFS.stat(this.fileName);
        if (err === 0) {
            const {
                size
            } = fsStat;
            const fileContentUnit = new Uint16Array(new ArrayBuffer(size));
            const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
            hmFS.seek(file, 0, hmFS.SEEK_SET);
            hmFS.read(file, fileContentUnit.buffer, 0, size);
            hmFS.close(file);

            try {
                const val = String.fromCharCode.apply(null, fileContentUnit);
                return val ? JSON.parse(val) : {};
            } catch (error) {
                return {};
            }
        }

        return {};
    }
    setItem(key, value) {
        this.contentObj[key] = value;
        this.save();
    }

    getItem(key, defaultValue) {
        if (key in this.contentObj) {
            return this.contentObj[key];
        } else {
            return defaultValue;
        }
    }

    removeItem(key) {
        delete this.contentObj[key];
        this.save();
    }

    clear() {
        this.contentObj = {};
        this.save();
    }
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

/* class SessionStorage {
  constructor(fileName = 'session_storage.txt') {
    this.fileName = fileName;
    this.contentObj = this.get();
  }
  save() {
    const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC);
    const contentBuffer = str2ab(JSON.stringify(this.contentObj));
    hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
    hmFS.close(file);
  }
  get() {
    const [fsStat, err] = hmFS.stat(this.fileName);
    if (err === 0) {
      const { size } = fsStat;
      const fileContentUnit = new Uint16Array(new ArrayBuffer(size));
      const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
      hmFS.seek(file, 0, hmFS.SEEK_SET);
      hmFS.read(file, fileContentUnit.buffer, 0, size);
      hmFS.close(file);
                      
      try {
        const val = String.fromCharCode.apply(null, fileContentUnit);
        return val ? JSON.parse(val) : {};
      } catch (error) {
        return {};
      }
    }
                      
    return {};
  }
  setItem(key, value) {
    this.contentObj[key] = value;
    this.save();
  }
                      
  getItem(key, defaultValue) {
    if (key in this.contentObj) {
      return this.contentObj[key];
    } else {
      return defaultValue;
    }
  }
                      
  removeItem(key) {
    delete this.contentObj[key];
    this.save();
  }
                      
  clear() {
    this.contentObj = {};
    this.save();
  }
} */
export
function getDateFormat() {
    let value
    switch (hmSetting.getDateFormat()) {
        case 0:
            value = "DATE_FORMAT_YMD"
            break;
        case 1:
            value = "DATE_FORMAT_DMY"
            break;
        case 2:
            value = "DATE_FORMAT_MDY"
            break;
    }
    return value
}

function getDistanceUnit() {
    let value
    switch (hmSetting.getMileageUnit()) {
        case 0:
            value = "DISTANCE_UNIT_METRIC"
            break;
        case 1:
            value = "DISTANCE_UNIT_IMPERIAL"
            break;
    }
    return value
}
export
function getLanguage() {
    return hmSetting.getLanguage()
}
export
function getSleepTarget() {
    return hmSetting.getSleepTarget()
}
export
function getTimeFormat() {
    let format
    switch (hmSetting.getTimeFormat()) {
        case 0:
            format = "TIME_HOUR_FORMAT_12"
            break;
        case 1:
            format = "TIME_HOUR_FORMAT_24"
            break;
    }
    return format
}
export
function getWeightTarget() {
    return hmSetting.getWeightTarget()
}
export
function getWeightUnit() {
    let value
    switch (hmSetting.getWeightUnit()) {
        case 0:
            value = "WEIGHT_UNIT_KILOGRAM"
            break;
        case 1:
            value = "WEIGHT_UNIT_JIN"
            break;
        case 2:
            value = "WEIGHT_UNIT_POUND"
            break;
        case 3:
            value = "WEIGHT_UNIT_STONE"
            break;
    }
    return value
}
export
function getAutoBrightness() {
    return hmSetting.getScreenAutoBright()
}
export
function getBrightness() {
    return hmSetting.getBrightness()
}
export
function setAutoBrightness(page) {
    hmSetting.setScreenAutoBright(page.autoBright)
}
export
function setBrightness(page) {
        hmSetting.setBrightness(page.brightness)
    }
    /* var num
    function setPageBrightTime(page) {
      hmSetting.setBrightness(page.brightTime)
      num = 0
    } */
export
function setScreenOff() {
    hmSetting.setScreenOff()
}
export
function setWakeUpRelaunch(option) {
    hmApp.setScreenKeep(option.relaunch)
}
export
function getDeviceInfo() {
    let deviceInfo = {};
    let value
    if (typeof hmDevice !== 'undefined') {
        switch (hmSetting.getDeviceInfo().screenShape) {
            case 0:
                value = "SCREEN_SHAPE_SQUARE"
                break;
            case 1:
                value = "SCREEN_SHAPE_ROUND"
                break;
        }
        deviceInfo = {
            width: hmSetting.getDeviceInfo().width,
            height: hmSetting.getDeviceInfo().height,
            screenShape: value,
            deviceName: hmSetting.getDeviceInfo().deviceName,
            keyNumber: hmSetting.getDeviceInfo().keyNumber,
            deviceSource: hmSetting.getDeviceInfo().deviceSource,
        };
    }
    return deviceInfo;
}
export
function getDiskInfo() {
    let getDiskInfo = {};
    if (typeof hmDevice !== 'undefined') {
        getDiskInfo = {
            total: hmSetting.getDiskInfo().total / 1024 / 1024,
            free: hmSetting.getDiskInfo().free / 1024 / 1024,
            app: hmSetting.getDiskInfo().app / 1024 / 1024,
            watchface: hmSetting.getDiskInfo().watchface / 1024 / 1024,
            music: hmSetting.getDiskInfo().music / 1024 / 1024,
            system: hmSetting.getDiskInfo().system / 1024 / 1024,
        };
    }
    return getDiskInfo;
}

export
function getProfile() {
    let getProfile = {};
    let value
    switch (hmSetting.getUserData().gender) {
        case 0:
            value = GENDER_MALE
            break;
        case 1:
            value = GENDER_FEMALE
            break;
        case 2:
            value = GENDER_UNSPECIFIED
            break;
    }
    if (typeof hmDevice !== 'undefined') {
        getProfile = {
            age: hmSetting.getUserData().age,
            height: hmSetting.getUserData().height,
            weight: hmSetting.getUserData().weight,
            gender: value,
            nickName: hmSetting.getUserData().nickName,
            region: hmSetting.getUserData().region,
        };
    }
    return getProfile;
}
export
function statSync(filename) {
    const [fs_stat, err] = hmFS.stat(filename);
    if (err === 0) {
        return fs_stat;
    } else {
        return null;
    }
}

export
function statAssetsSync(filename) {
    const [fs_stat, err] = hmFS.stat_asset(filename.path);
    if (err === 0) {
        return fs_stat;
    } else {
        return null;
    }
}
export
function writeFileSync(filename) {
    const source_buf = Uint8Array.from([...filename.data].map(c => c.charCodeAt(0)));
    const file = hmFS.open(filename.path, hmFS.O_CREAT | hmFS.O_RDWR | hmFS.O_TRUNC);
    hmFS.seek(file, 0, hmFS.SEEK_SET);
    hmFS.write(file, source_buf.buffer, 0, source_buf.length);
    hmFS.close(file);
}
export
function readFileSync(filename) {
    const fs_stat = statSync(filename.path);
    if (!fs_stat) return 'notfile';
    const size = fs_stat.size;
    const buf = new Uint8Array(size);
    const file = hmFS.open(filename.path, hmFS.O_RDONLY);
    hmFS.read(file, buf.buffer, 0, buf.length);
    hmFS.close(file);
    const content = String.fromCharCode(...buf);
    return content;
}
export
function openSync(filename) {
    return hmFS.open(filename.path, filename.flag)
}
export
function closeSync({
    path
}) {
    return hmFS.close(path);
}
export
function mkdirSync({
    filename
}) {
    return hmFS.open(filename.path, hmFS.O_CREAT)
}

export
function getScene() {
    let value
    switch (hmSetting.getWeightUnit()) {
        case hmSetting.screen_type.APP:
            value = "SCENE_APP"
            break;
        case hmSetting.screen_type.WATCHFACE:
            value = "SCENE_WATCHFACE"
            break;
        case hmSetting.screen_type.SETTINGS:
            value = "SCENE_SETTINGS"
            break;
        case hmSetting.screen_type.AOD:
            value = "SCENE_AOD"
            break;
    }
    return value
}
