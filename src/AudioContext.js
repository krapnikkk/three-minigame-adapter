import Audio from './Audio'

export default class AudioContext extends Audio{
    getContext(){
        console.warn("wx doesn't support AudioContext API")
    }

    decodeAudioData(ArrayBuffer, successCallback, errorCallback){
        successCallback(ArrayBuffer);
    }

}