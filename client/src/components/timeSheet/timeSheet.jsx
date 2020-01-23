import React, { Fragment, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import './timeSheet.css'
import Autocomplete from 'react-autocomplete'

export default (props) => {

    function handleDateClick(arg) {
        alert(arg.dateStr)
    }
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    const [projectSearchText, setProjectSearchText] = useState('')
    const [projectFilter, setProjectFilter] = useState([{ label: 'Type Here' }])
    const [projects, setProjects] = useState([
        { label: 'Test Project 1' },
        { label: 'Test project 2' },
        { label: 'Test Project 3' },
        { label: 'Test Project 4' },
        { label: 'Test Project 5' }
    ])

    function filterData(val) {
        setProjectSearchText(val)
        setProjectFilter(projects.filter(_ => _.label.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1))
    }


    return (
        <Fragment>
            <div>
                <Row>
                    <Col md="9">
                        <FullCalendar defaultView="dayGridMonth"
                            height="parent"
                            plugins={[dayGridPlugin, interactionPlugin]}
                            dateClick={_ => handleDateClick(_)}
                            events={[
                                { title: '8.75 Hrs', date: '2020-01-10' },
                                { title: '9 Hrs', date: '2020-01-14' },
                                { title: '9 Hrs', date: '2020-01-15' },
                                { title: '9 Hrs', date: '2020-01-13' }
                            ]} />
                    </Col>
                    <Col>
                    <div>
                            <h3>Project</h3>
                            <Autocomplete
                                getItemValue={(item) => item.label}
                                items={projectFilter}
                                renderItem={(item, isHighlighted) =>
                                    <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                        {item.label}
                                    </div>
                                }
                                value={projectSearchText}
                                onChange={(e) => filterData(e.target.value)}
                                onSelect={(val) => setProjectSearchText(val)}
                            />
                            <br />

                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}