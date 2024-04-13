import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	useState,
	getState,
	preState,
	createElement 
} from "./sydneyDom.js";

setStyle([
    {
        nameTag:'dashboard',
        style:{
            height:'100%',
            width:'100%',
            background:'rgba(242,244,243)',
            display:'flex',
            columnGap:'40px',
            rowGap:'40px',
            overflowY:'scroll',
            padding:'15px',
        }
    },
    {
        nameTag:'profileMenu',
        style:{
            display:'flex',
            flexDirection:'column',
            rowGap:'10px',
            height:'fit-content'
        }
    },
    {
        nameTag:"profileContent",
        style:{
            height:'fit-content',
            display:'flex',
            flexDirection:'column',
            rowGap:'10px',
            padding:'12px',
            paddingTop:'15px',
            background:'#fff',
            boxShadow:'-2px 8px 20px rgba(0,0,0,.2)',
            position:'relative',
            transition:'opacity linear .3s'
        }
    },
    {
        nameTag:'info_box',
        style:{
            display:'flex',
            flexDirection:'column',
            rowGap:'8px',
            width:'100%',
            padding:'10px',
        }
    },
    {
        nameTag:'input',
        style:{
            height:'40px',
            background:'#F3F3F3',
            width:'100%',
            outline:'none',
            borderRadius:'7px',
            width:'100%',
            paddingLeft:'20px',
            textTransform:'capitalize'
        }
    }
])

const selectObject = {
    state:[
        'Anambara',
        'bauchi',
        'kogi',
        'lokoja',
        'kwara',
        'illorin',
        'abuja',
        'lagos',
        'taraba',
        'edo'
    ],
    gender:[
        'Male',
        'Female'
    ],
    bank:[
        'zenith bank',
        'uba bank',
        'first bank',
        'access bank'
    ]
}

sydDOM.dashboardService = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.dashboard(),
            id:'profileService'
        },
        [
            sydDOM.profileMenu(),
            sydDOM.profileContent()
        ]
    )
}
sydDOM.profileMenu = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.profileMenu(),
            class:'profileMenu'
        },
        [
            sydDOM.profileMenuElement({text:'View Profile',id:0,classType:'fa-regular fa-user'}),
            sydDOM.profileMenuElement({text:'Edit Profile',id:1,classType:'fa-solid fa-pen-to-square'}),
            sydDOM.profileMenuElement({text:'Bank Details',id:2,classType:'fa-solid fa-building-columns'}),
            sydDOM.profileMenuElement({text:'Change Password',id:3,classType:'fa-solid fa-lock'}),
        ],
        {
            createState:{
                stateName:'profileMenu',
                state:{idx:0}
            },
            type:"profileMenu"
        }
    )
}

sydDOM.profileMenuElement = ({text = 'Dashboard',func = 'dashboard', classType = 'fa-solid fa-gauge-high', id} = {}) =>{
    menuBtn = (id) =>{
        let Pstate = getState('profileMenu');
        let PstateInfo = getState('profileInfo')
        let Cstate_login = getState('login_button');
        const formNames = ['view','edit','bank','password']

        Pstate.idx = id;
        useState('profileMenu',{type:'a',value:Pstate})

        const trueState = getState(formNames[id]);
        trueState.d = 'flex';
        useState(formNames[id],{type:'a',value:trueState})
        const timer = setTimeout(() =>{
            clearTimeout(timer);
            trueState.o = '1'
            useState(formNames[id],{type:'a',value:trueState})
        },100);

        //update false states
        for(let state_id in formNames)
        {
            switch(true)
            {
                case Number(state_id) !== id:
                    const falseState = getState(formNames[state_id]);
                    falseState.o = '0';
                    useState(formNames[state_id],{type:'a',value:falseState})
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        falseState.d = 'none';
                        useState(formNames[state_id],{type:'a',value:falseState})
                    }, 300);
            }
        }
    }
    return createElement(
        'div',
        {
            style:`height:45px;min-height:45px;width:100%;display:flex;column-gap:10px;border-radius:5px;align-items:center;padding-left:10px;color:${preState(['profileMenu','idx'],0) === id ? '#fff' : '#000'};background-color:${preState(['profileMenu','idx'],0) === id ? '#000' : 'transparent'}`,
            class:'profileMenuElement select',
            onclick:`menuBtn(${id})`
        },
        [
            createElement('i',{class:classType}),
            text
        ]
    )
}
sydDOM.profileContent = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.profileContent({method:"remove",style:['boxShadow']}),
            class:'profileContent'
        },
        [
            sydDOM.view(),
            sydDOM.edit(),
            sydDOM.bank(),
            sydDOM.password()
        ]
    )
}
sydDOM.view = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.profileContent(
                {method:'add',style:{position:'absolute',top:'0',left:'0',width:'100%',display:preState(['view','d'],'flex'),opacity:preState(['view','o'],'1')}}
                )
        },
        [
            sydDOM.info_box({text:'Name',params:['text','name_d','name_id']}),
            createElement(
                'div',
                {style:'width:100%;display:flex;row-gap:10px',class:'info_wrap'},
                [
                    sydDOM.info_box({text:'Email',params:['email','email_d','email_id']}),
                    sydDOM.info_box({text:'mobile Number',params:['number','mobile_d','mobile_id']}),
                ]
            ),
            createElement(
                'div',
                {style:'width:100%;display:flex;row-gap:10px',class:'info_wrap'},
                [
                    sydDOM.info_box({text:'State',params:['text','state_d','state_id']}),
                    sydDOM.info_box({text:'Gender',params:['text','gender_d','gender_id']}),
                ]
            ),
            sydDOM.info_box({text:'Date Of Birth',params:['text','dob_d','dob_id']})

        ],
        {
            createState:{
                stateName:'view',
                state:{data:{},d:'flex',o:'1'}
            },
            type:'view'
        }
    )
}

sydDOM.edit = () =>{
    return createElement(
        'form',
        {
            style:styleComponent.profileContent(
                {method:'add',style:{position:'absolute',top:'0',left:'0',width:'100%',display:preState(['edit','d'],'none'),opacity:preState(['edit','o'],'0')}}
                )
        },
        [
            sydDOM.info_box({text:'Name',params:['text','name_a','name_a_id'],readonly:false}),
            createElement(
                'div',
                {style:'width:100%;display:flex;row-gap:10px',class:'info_wrap'},
                [
                    sydDOM.info_box({text:'mobile Number',params:['number','mobile_a','mobile_a_id'],readonly:false}),
                    sydDOM.select_box()
                ]
            ),
            createElement(
                'div',
                {style:'width:100%;display:flex;row-gap:10px',class:'info_wrap'},
                [
                    sydDOM.select_box('Gender'),
                    sydDOM.info_box({text:'Date Of Birth',params:['date','dob_a','dob_a_id'],readonly:false})
                ]
            ),
            sydDOM.login_button()
        ],
        {
            createState:{
                stateName:'edit',
                state:{data:{},d:'none',o:'0'}
            },
            type:'edit'
        }
    )
}

sydDOM.bank = () =>{
    return createElement(
        'form',
        {
            style:styleComponent.profileContent(
                {method:'add',style:{position:'absolute',top:'0',left:'0',width:'100%',display:preState(['bank','d'],'none'),opacity:preState(['bank','o'],'0')}}
                )
        },
        [
            sydDOM.info_box({text:'Account Name',params:['text','acc_name','acc_name_id'],readonly:false}),
            sydDOM.info_box({text:'Account Number',params:['number','acc_num_','acc_num_id'],readonly:false}),
            sydDOM.select_box('Bank'),
            sydDOM.login_button()
        ],
        {
            createState:{
                stateName:'bank',
                state:{data:{},d:'none',o:'0'}
            },
            type:'bank'
        }
    )
}

sydDOM.password = () =>{
    return createElement(
        'form',
        {
            style:styleComponent.profileContent(
                {method:'add',style:{position:'absolute',top:'0',left:'0',width:'100%',display:preState(['password','d'],'none'),opacity:preState(['password','o'],'0')}}
                )
        },
        [
            sydDOM.info_box({text:'Current Password',params:['password','currentpass_name','currentpass_id'],readonly:false}),
            sydDOM.info_box({text:'New Password',params:['password','newpass_name','newpass_id'],readonly:false}),
            sydDOM.info_box({text:'Confirm Password',params:['password','confirmpass_name','confirmpass_id'],readonly:false}),
            sydDOM.login_button()
        ],
        {
            createState:{
                stateName:'password',
                state:{data:{},d:'none',o:'0'}
            },
            type:'password'
        }
    )
}








sydDOM.info_box = ({text = 'Email',params = [],readonly = true} = {}) =>{
    return createElement(
        'div',
        {
            style:styleComponent.info_box()
        },
        [
            createElement('p',{style:'color:grey'},[!readonly ? text+'*' : text]),
            createElement(
                'input',
                {
                    style:styleComponent.input()+`pointer-events:${readonly ? 'none' : 'unset'}`,
                    // oninput:`updateInput.bind()(this,'${text}')`,
                    value:preState(['view','data',text.toLowerCase()],''),
                    type:params[0],
                    name:params[1],
                    id:params[2]
                })
        ]
    )
}

sydDOM.select_box = (type = 'state',bool = true) =>{
    const options = () =>{
        let array = [sydDOM.disable_option(`select ${type}`)];
        selectObject[type.toLowerCase()].forEach(val =>{
            array.push(sydDOM.option(val))
        });
        return array;
    }
    return createElement(
        'div',
        {
            style:styleComponent.info_box()
        },
        [
            createElement('p',{style:'color:grey'},[bool ? type+'*' : type]),
            createElement('select',{
                style:styleComponent.input({method:'add',style:{cursor:'pointer',fontSize:'16px',fontFamily:'ubuntu',textTransform:'capitalize'}}),
                name:type.split(' ').join('_') +`_${type[0].toLowerCase()}_`+'n',
                id:type.split(' ').join('_') +`_${type[0].toLowerCase()}_`+'id',
            },
            [
                ...options()
            ]
            )
        ]
    )
}
sydDOM.option = (value) =>{
    return createElement(
        'option',
        {
            value:value,
            style:'font-family:ubuntu;font-size:16px;text-transform:capitalize'
        },
        [
            value
        ]
    )
}
sydDOM.disable_option = (value) =>{
    return createElement(
        'option',
        {
            value:value,
            disabled:true,
            selected:true,
            style:'font-family:ubuntu;font-size:16px;'
        },
        [
            value
        ]
    )
}

sydDOM.login_button = () =>{
    return createElement(
        'div',
        {
            style:'padding:10px 0;width:100%;height:60px;min-height:60px;padding-right:25px;padding-left:10px;display:flex;align-items:center'
        },
        [
            createElement(
                'button',
                {
                    style:'height:fit-content;width:fit-content;padding:10px 20px;background:#2F55DC;display:flex;justify-content:center;align-items:center;border-radius:7px;font-weight:700;color:#fff',
                    class:'select',
                    type:'submit'
                    // onclick:'submit_details()'
                },
                [
                    "Submit"
                ]
            )
        ]
    )
}