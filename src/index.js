import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Timer extends Component{
    constructor(props){
        super(props)
        this.state={
            Minute:0,
            Second:0,
            totalTime:0,
            timingState:false
        }
        //setInterval用的flag
        this.flag=0
    }

    //使用者輸入分鐘
    changeMin = (e)=>{
        //只允許輸入數字
        let locMin = parseInt(e.target.value.replace(/\D+/g,''))
        if(isNaN(locMin)){locMin=0}
        //限制分鐘上線
        if(locMin > 60){
            locMin = 60
        }
        //重新計算總時間
        let newTotalTime = locMin*60 + this.state.Second
        this.setState({
            Minute:locMin,
            totalTime:newTotalTime
        })
    }

    //使用者輸入秒數
    changeSec = (e)=>{
        //只允許輸入數字
        let locSec = parseInt(e.target.value.replace(/\D+/g,''))
        if(isNaN(locSec)){locSec=0}
        //限制秒數上線
        if(locSec > 60){ 
            locSec = 60 
        }
        //重新計算總時間
        let newTotalTime = this.state.Minute*60 + locSec
        this.setState({
            Second:locSec,
            totalTime:newTotalTime
        })
    }

    //開始計時
    timing=()=>{
        //改變計時狀態(影響按紐的顯示狀態)
        this.setState({
            timingState:true
        })
        //倒數計時並儲存flag
        this.flag = setInterval(() => {
            this.setState({
                totalTime: this.state.totalTime - 1
            })
            //如果剩0秒結束倒數
            if(this.state.totalTime === 0){
                this.reset()
            }
        }, 1000);
    }
    
    //暫停計時
    stop=()=>{
        //改變計時狀態(影響按紐的顯示狀態)
        this.setState({
            timingState:false
        })
        //停止倒數
        clearInterval(this.flag);
    }

    reset=()=>{
        //改變計時狀態(影響按紐的顯示狀態), 並重置時間
        let originalTotalTime = this.state.Minute*60 + this.state.Second
        this.setState({
            totalTime: originalTotalTime,
            timingState:false
        })
        //停止倒數
        clearInterval(this.flag)
    }

    render(){
        //取計時用的分鐘(無條件捨去)
        let timerMin = Math.floor(this.state.totalTime / 60)
        //取計時用的秒數
        let timerSec = this.state.totalTime % 60
        

        return(
        <div>
            <h2> Tommy 計時器! </h2>
            <h4>請設定時間(最多60分60秒):</h4>
            <input
                value={this.state.Minute}
                onChange={this.changeMin}
            />分
            <input
                value={this.state.Second}
                onChange={this.changeSec}
            />秒
            <dir>
                <h2>{timerMin}分:{timerSec} 秒</h2>
                <div>
                    <button 
                        onClick={this.timing}
                        disabled={this.state.timingState === true ? "disabled" : ""}
                    >   開始
                    </button>
                    <button 
                        onClick={this.stop}
                        disabled={this.state.timingState === true ? "" : "disabled"}
                    >   暫停
                    </button>
                    <button onClick={this.reset}>
                        重新
                    </button>
                </div>
            </dir>
        </div>
        )
    }    
}

ReactDOM.render(
    <Timer/>,
    document.getElementById('root')
)
