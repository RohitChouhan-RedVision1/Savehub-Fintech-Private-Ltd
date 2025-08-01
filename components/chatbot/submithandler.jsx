'use client';
import { useEffect, useRef } from 'react';
import axios from 'axios';

const SubmitHandler = ({ steps }) => {
    const submitted = useRef(false);

    useEffect(() => {
        if (submitted.current) return;

        const { name, email, address, mobile, services } = steps;

        const leadData = {
            name: name.value,
            email: email.value,
            address: address.value,
            mobile: mobile.value,
            services: services.value, // array
        };

        const sendLead = async () => {
            try {
                await axios.post('/api/bot/leads', leadData);
                submitted.current = true;

                const whatsappText =
                    '*Name*: ' + encodeURIComponent(leadData.name) + '%0a' +
                    '*Phone*: ' + encodeURIComponent(leadData.mobile) + '%0a' +
                    '*E-mail*: ' + encodeURIComponent(leadData.email) + '%0a' +
                    '*Address*: ' + encodeURIComponent(leadData.address) + '%0a' +
                    '*Services*: ' + encodeURIComponent(leadData.services.join(', '));

                const whatsappUrl = `https://wa.me/9483079056?text=${whatsappText}`;
                window.open(whatsappUrl, '_blank');
            } catch (error) {
                console.error('Error saving lead:', error);
            }
        };

        sendLead();
    }, [steps]);

    return <div>Thank you! We’re processing your request...</div>;
};

export default SubmitHandler;
