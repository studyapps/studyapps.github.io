//import { multiplyByFactor } from './bidirectional-comm.mjs';

class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.Unit = 'BPM' // テンポの単位
        this.tempoValue = '120'; // テンポの数値
        this.temponoteValue = '1'; // テンポの基準となる音符
        this.noteValue = '4'; // 音符
        this.restValue = '4'; // 休符
        this.periodValue = 60 / this.tempoValue / this.temponoteValue; //１小節の時間
        this.scaleValue = '60'; //ドレミ
        this.chapterValue = ''; //現在実行中のチャプター
        this.chapterChange = '';
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'DANCE',
            // blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAC4jAAAuIwF4pT92AAAq3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6aWxsdXN0cmF0b3I9Imh0dHA6Ly9ucy5hZG9iZS5jb20vaWxsdXN0cmF0b3IvMS4wLyIgeG1sbnM6eG1wVFBnPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvdC9wZy8iIHhtbG5zOnN0RGltPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvRGltZW5zaW9ucyMiIHhtbG5zOnhtcEc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nLyIgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTIyVDE3OjU2OjI0KzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wOC0yMlQxNzo1NjoyNCswOTowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMjJUMTc6NTQ6NTArMTA6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgMjguNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRlYzhjN2UtMzM0NS1mOTRjLTg4YzctMDJiMzNmYzY5OGNjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmI4ZjRkODM1LWFmYWMtOTc0NC1iMzI3LWY2M2Y2ZGNhNWJhYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpSZW5kaXRpb25DbGFzcz0icHJvb2Y6cGRmIiBpbGx1c3RyYXRvcjpUeXBlPSJEb2N1bWVudCIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IlByaW50IiBpbGx1c3RyYXRvcjpDcmVhdG9yU3ViVG9vbD0iQUlSb2JpbiIgeG1wVFBnOkhhc1Zpc2libGVPdmVycHJpbnQ9IkZhbHNlIiB4bXBUUGc6SGFzVmlzaWJsZVRyYW5zcGFyZW5jeT0iRmFsc2UiIHhtcFRQZzpOUGFnZXM9IjEiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPuWPjOaWueWQkeaAp+OCouOCpOOCs+ODszwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ1dWlkOjg1NDIwNmQzLTRhN2YtNDI2MS05ODc1LWUwNTMzNDQ3ZTU5ZCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgc3RSZWY6cmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNTQ5M2IwOC1lMDBiLWIwNDYtYWYyYS1hYTk1MjhhMjhlYTMiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NDA6NTUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTI6NDUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NGVjOGM3ZS0zMzQ1LWY5NGMtODhjNy0wMmIzM2ZjNjk4Y2MiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTY6MjQrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBUUGc6TWF4UGFnZVNpemUgc3REaW06dz0iODAuMDAwMDAwIiBzdERpbTpoPSI4MC4wMDAwMDAiIHN0RGltOnVuaXQ9IlBpeGVscyIvPiA8eG1wVFBnOlBsYXRlTmFtZXM+IDxyZGY6U2VxPiA8cmRmOmxpPkN5YW48L3JkZjpsaT4gPHJkZjpsaT5NYWdlbnRhPC9yZGY6bGk+IDxyZGY6bGk+WWVsbG93PC9yZGY6bGk+IDxyZGY6bGk+QmxhY2s8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3htcFRQZzpQbGF0ZU5hbWVzPiA8eG1wVFBnOlN3YXRjaEdyb3Vwcz4gPHJkZjpTZXE+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9IuWIneacn+ioreWumuOBruOCueOCpuOCqeODg+ODgeOCsOODq+ODvOODlyIgeG1wRzpncm91cFR5cGU9IjAiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0i44Ob44Ov44Kk44OIIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyNTUiIHhtcEc6Ymx1ZT0iMjU1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSLjg5bjg6njg4Pjgq8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIzNSIgeG1wRzpncmVlbj0iMjQiIHhtcEc6Ymx1ZT0iMjEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Os44OD44OJIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMwIiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjE4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCpOOCqOODreODvCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjQxIiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Kw44Oq44O844OzIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTUzIiB4bXBHOmJsdWU9IjY4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCt+OCouODsyIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSIyMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44OW44Or44O8IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjkiIHhtcEc6Z3JlZW49IjMyIiB4bXBHOmJsdWU9IjEzNiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQ01ZSyDjg57jgrzjg7Pjgr8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMjgiIHhtcEc6Z3JlZW49IjAiIHhtcEc6Ymx1ZT0iMTI3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTE1IE09MTAwIFk9OTAgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5NSIgeG1wRzpncmVlbj0iMTMiIHhtcEc6Ymx1ZT0iMzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTkwIFk9ODUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMyIiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSI0MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09ODAgWT05NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzQiIHhtcEc6Z3JlZW49Ijg1IiB4bXBHOmJsdWU9IjIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT01MCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDMiIHhtcEc6Z3JlZW49IjE1MiIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0zNSBZPTg1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0OCIgeG1wRzpncmVlbj0iMTgyIiB4bXBHOmJsdWU9IjQ1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUgTT0wIFk9OTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjUwIiB4bXBHOmdyZWVuPSIyMzgiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0yMCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE4IiB4bXBHOmdyZWVuPSIyMjQiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQzIiB4bXBHOmdyZWVuPSIxOTUiIHhtcEc6Ymx1ZT0iMzEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzUgTT0wIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM0IiB4bXBHOmdyZWVuPSIxNzIiIHhtcEc6Ymx1ZT0iNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTQ1IiB4bXBHOmJsdWU9IjU4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTkwIE09MzAgWT05NSBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjUyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTc1IE09MCBZPTc1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5IiB4bXBHOmdyZWVuPSIxNzQiIHhtcEc6Ymx1ZT0iMTAzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTgwIE09MTAgWT00NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjIiIHhtcEc6Ymx1ZT0iMTU0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTcwIE09MTUgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQ2IiB4bXBHOmdyZWVuPSIxNjciIHhtcEc6Ymx1ZT0iMjI0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTg1IE09NTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjMiIHhtcEc6Z3JlZW49IjExMCIgeG1wRzpibHVlPSIxODQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTUgWT01IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSI0MiIgeG1wRzpibHVlPSIxMzYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09MTAwIFk9MjUgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSIyOCIgeG1wRzpibHVlPSI5NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49IjI1IiB4bXBHOmJsdWU9IjEzNCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ2IiB4bXBHOmdyZWVuPSI3IiB4bXBHOmJsdWU9IjEzMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zNSBNPTEwMCBZPTM1IEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxNjQiIHhtcEc6Z3JlZW49IjExIiB4bXBHOmJsdWU9IjkzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTEwIE09MTAwIFk9NTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE1IiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjgxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT05NSBZPTIwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMjIiIHhtcEc6Ymx1ZT0iMTE1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09MjUgWT00MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE4OCIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT00NSBZPTUwIEs9NSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE2NCIgeG1wRzpncmVlbj0iMTM5IiB4bXBHOmJsdWU9IjEyMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTUwIFk9NjAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyMiIgeG1wRzpncmVlbj0iMTA2IiB4bXBHOmJsdWU9Ijg2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTU1IE09NjAgWT02NSBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49Ijc2IiB4bXBHOmJsdWU9IjYzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09NDAgWT02NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSI5OSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zMCBNPTUwIFk9NzUgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE3OCIgeG1wRzpncmVlbj0iMTMwIiB4bXBHOmJsdWU9IjcxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTM1IE09NjAgWT04MCBLPTI1IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ5IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSI1MiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz00MCBNPTY1IFk9OTAgSz0zNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyNyIgeG1wRzpncmVlbj0iNzkiIHhtcEc6Ymx1ZT0iMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT03MCBZPTEwMCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTA2IiB4bXBHOmdyZWVuPSI1NyIgeG1wRzpibHVlPSI2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUwIE09NzAgWT04MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjQiIHhtcEc6Z3JlZW49IjM0IiB4bXBHOmJsdWU9IjE1Ii8+IDwvcmRmOlNlcT4gPC94bXBHOkNvbG9yYW50cz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOmxpPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHhtcEc6Z3JvdXBOYW1lPSLjgrDjg6zjg7wiIHhtcEc6Z3JvdXBUeXBlPSIxIj4gPHhtcEc6Q29sb3JhbnRzPiA8cmRmOlNlcT4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTAgWT0wIEs9MTAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMzUiIHhtcEc6Z3JlZW49IjI0IiB4bXBHOmJsdWU9IjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTkwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjIiIHhtcEc6Z3JlZW49IjU4IiB4bXBHOmJsdWU9IjU3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTgwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iODkiIHhtcEc6Z3JlZW49Ijg3IiB4bXBHOmJsdWU9Ijg3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTE0IiB4bXBHOmdyZWVuPSIxMTMiIHhtcEc6Ymx1ZT0iMTEzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTYwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTM3IiB4bXBHOmdyZWVuPSIxMzciIHhtcEc6Ymx1ZT0iMTM3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTU5IiB4bXBHOmdyZWVuPSIxNjAiIHhtcEc6Ymx1ZT0iMTYwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTgxIiB4bXBHOmdyZWVuPSIxODEiIHhtcEc6Ymx1ZT0iMTgyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjAxIiB4bXBHOmdyZWVuPSIyMDIiIHhtcEc6Ymx1ZT0iMjAyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTIwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjIwIiB4bXBHOmdyZWVuPSIyMjEiIHhtcEc6Ymx1ZT0iMjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM5IiB4bXBHOmdyZWVuPSIyMzkiIHhtcEc6Ymx1ZT0iMjM5Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDciIHhtcEc6Z3JlZW49IjI0OCIgeG1wRzpibHVlPSIyNDgiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9Iui8neOBjSIgeG1wRzpncm91cFR5cGU9IjEiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MTAwIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMCIgeG1wRzpibHVlPSIxOCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09NzUgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM1IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0xMCBZPTk1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjI2IiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNTQiIHhtcEc6Ymx1ZT0iNjIiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjExIiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NjAgTT05MCBZPTAgSz0wIiB4bXBH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',
            color1: '#000000', // ブロックのメインカラー
            color2: '#000000', // ブロックの枠線や影の色
            blocks: [
                {
                    opcode: 'setPeriod',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'テンポ [NOTE] = [TEMPO] [UNIT]',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4', // 初期値
                            menu: 'noteMenu'
                        },
                        TEMPO: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '120', // 初期値
                        },
                        UNIT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1', // 初期値
                            menu: 'unitMenu'
                        }
                    }
                },
                {
                    opcode: 'chooseScale',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[SCALE]',
                    arguments: {
                        SCALE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '60', // 初期値
                            menu: 'scaleMenu'
                        }
                    }
                },
                {
                    opcode: 'chooseNote',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NOTE]',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4', // 初期値
                            menu: 'noteMenu'
                        }
                    }
                },
                {
                    opcode: 'chooseRest',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '休符 [REST]',
                    arguments: {
                        REST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '4', // 初期値
                            menu: 'restMenu'
                        }
                    }
                },
                 {
                    opcode: 'whenChapterStart',
                    blockType: Scratch.BlockType.HAT,
                    text: 'チャプター[CHAPTER]が開始されたとき',
                    arguments: {
                        CHAPTER:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1', // 初期値
                            menu: 'chapterMenu'
                        }  
                    }
                },
                {
                    opcode: 'startChapter',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'チャプター[CHAPTER]を開始',
                    arguments: {
                        CHAPTER:{
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1', // 初期値
                            menu: 'chapterMenu'
                        }  
                    }
                },
                {
                    opcode: 'setChapter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'チャプター'
                }
                //{
                //    opcode: 'waitUntil',
                //    blockType: Scratch.BlockType.COMMAND,
                //    text: 'チャプター[CHAPTER]が開始されるまで待つ',
                //    arguments: {
                //        CHAPTER:{
                //            type: Scratch.ArgumentType.STRING,
                //            defaultValue: '1', // 初期値
                //            menu: 'chapterMenu'
                //        }  
                //    }
                //}
            ],
            menus: {
                noteMenu: [
                    { text: '𝅝', value: '1'},
                    { text: '𝅗𝅥', value: '2'},
                    { text: '𝅘𝅥', value: '4'},
                    { text: '𝅘𝅥𝅮', value: '8'},
                    { text: '𝅘𝅥𝅯', value: '16'},
                    { text: '𝅘𝅥𝅰', value: '32'},
                    { text: '𝅘𝅥𝅱', value: '64'},
                    { text: '𝅘𝅥𝅲', value: '128'}
                ],
                restMenu: [
                    { text: '𝄻', value: '1'},
                    { text: '𝄼', value: '2'},
                    { text: '𝄽', value: '4'},
                    { text: '𝄾', value: '8'},
                    { text: '𝄿', value: '16'},
                    { text: '𝅀', value: '32'},
                    { text: '𝅁', value: '64'},
                    { text: '𝅂', value: '128'} 
                ],
                unitMenu: [
                    { text: 'BPM', value: '1'},
                    { text: '秒', value: '2'},
                ],
                scaleMenu: [
                    {text: 'ド(低)', value: '48'},
                    {text: '#ド(低)', value: '49'},
                    {text: 'レ(低)', value: '50'},
                    {text: '#レ(低)', value: '51'},
                    {text: 'ミ(低)', value: '52'},
                    {text: 'ファ(低)', value: '53'},
                    {text: '#ファ(低)', value: '54'},
                    {text: 'ソ(低)', value: '55'},
                    {text: '#ソ(低)', value: '56'},
                    {text: 'ラ(低)', value: '57'},
                    {text: '#ラ(低)', value: '58'},
                    {text: 'シ(低)', value: '59'},
                    {text: 'ド', value: '60'},
                    {text: '#ド', value: '61'},
                    {text: 'レ', value: '62'},
                    {text: '#レ', value: '63'},
                    {text: 'ミ', value: '64'},
                    {text: 'ファ', value: '65'},
                    {text: '#ファ', value: '66'},
                    {text: 'ソ', value: '67'},
                    {text: '#ソ', value: '68'},
                    {text: 'ラ', value: '69'},
                    {text: '#ラ', value: '70'},
                    {text: 'シ', value: '71'},
                    {text: 'ド(高)', value: '72'},
                    {text: '#ド(高)', value: '73'},
                    {text: 'レ(高)', value: '74'},
                    {text: '#レ(高)', value: '75'},
                    {text: 'ミ(高)', value: '76'},
                    {text: 'ファ(高)', value: '77'},
                    {text: '#ファ(高)', value: '78'},
                    {text: 'ソ(高)', value: '79'},
                    {text: '#ソ(高)', value: '90'},
                    {text: 'ラ(高)', value: '91'},
                    {text: '#ラ(高)', value: '92'},
                    {text: 'シ(高)', value: '93'}
                ],
                chapterMenu: {
                    acceptReporters: true, // 変数ブロックをドロップ可能にする
                    items: ['ALL PLAY', ...Array.from({ length: 99 }, (_, i) => (i + 1).toString())]
                }
            }
        };
    }

    chooseNote(args) {
        this.noteValue = 1 / parseFloat(args.NOTE);
        return this.noteValue * this.periodValue;
    }
    async chooseRest(args) {
        this.restValue = 1 / parseFloat(args.REST);
        await new Promise(resolve => setTimeout(resolve, this.restValue * this.periodValue * 1000));
    }
    chooseScale(args) {
        this.scaleValue = parseInt(args.SCALE,10);
        return this.scaleValue;
    }
    setPeriod(args) {
        if( args.UNIT === '1' ){
            this.periodValue = 60 / parseFloat(args.TEMPO) * parseFloat(args.NOTE);
        }else if( args.UNIT === '2' ){
            this.periodValue = parseFloat(args.TEMPO) * parseFloat(args.NOTE);
        }
    }
    setChapter() {
        return this.chapterValue;
    } 
    startChapter(args) {
        setTimeout(() => {
            this.chapterValue = args.CHAPTER;
            this.chapterChange = args.CHAPTER;
        }, 100); 

        setTimeout(() => {
            this.chapterChange = '';
        }, 100); 
    }
    whenChapterStart(args) {
        return this.chapterChange == args.CHAPTER;
    }
    async waitUntil(args) {
        while (this.chapterChenge !=  args.CHAPTER) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

Scratch.extensions.register(new CustomExtension());