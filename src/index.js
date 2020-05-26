import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Timer extends Component{
    constructor(props){
        super(props)
        this.state={
            setMinute:0,
            setSecond:0,
            total:0
        }
        this.flag=0
    }

    changeMin = (e)=>{
        //只取int
        let locMin = parseInt(e.target.value)
        if(locMin > 60){
            locMin = 60
        }

        let newTotalTime = locMin*60 + this.state.setSecond

        this.setState({
            setMinute:locMin,
            total:newTotalTime
        })
        console.log(this.state)
    }
    
    changeSec = (e)=>{
        //只取int
        let locSec = parseInt(e.target.value)

        if(locSec > 60){ 
            locSec = 60 
        }

        let newTotalTime = this.state.setMinute*60 + locSec

        this.setState({
            setSecond:locSec,
            total:newTotalTime
        })
        
        console.log(this.state)
    }

    timer=()=>{
        this.flag = setInterval(() => {
            this.setState({
                total: this.state.total - 1
            })
            //如果勝0秒結束倒數
            if(this.state.total === 0){
                clearInterval(this.flag);
            }
        }, 1000);
    }

    reset=()=>{
        clearInterval(this.flag);
        this.setState({
            total: 0
        })
    }

    render(){
        //無條件捨去
        let timerMin = Math.floor(this.state.total / 60)
        let timerSec = this.state.total % 60
        

        return(
        <div>
            <h2> Tommy 計時器! </h2>
            <input
                value={this.state.setMinute}
                onChange={this.changeMin}
            />
            <input
                value={this.state.setSecond}
                onChange={this.changeSec}
            />
            <dir>
                <h2>{timerMin}分:{timerSec} 秒</h2>
                <div>
                    <button onClick={this.timer}>
                        開始
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
