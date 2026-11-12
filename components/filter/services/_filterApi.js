// services/filterApi.js
import axios from 'axios';
import { Alert, Platform } from 'react-native';

const BASE_URL = 'https://api.boomlex.ir/api';

export const filterApi = {
  getFilteredWorkers: async (filters = {}) => {
    try {
      console.log('🎯 filterApi.getFilteredWorkers called with filters:', {
        ...filters,
        // Hide sensitive data in logs
        lat: filters.lat ? 'present' : 'missing',
        long: filters.long ? 'present' : 'missing',
      });

      // Clean filters before sending - REMOVE TRAILING SPACES
      const cleanedFilters = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        // Remove trailing spaces from keys (especially important for Persian field names)
        const cleanKey = key.trim();
        cleanedFilters[cleanKey] = value;
        
        // Debug logging for specific filters
        if (cleanKey.includes('طبقه') || cleanKey.includes('متراژ')) {
          console.log('🔍 Filter Key Debug:', {
            key: key,
            cleanedKey: cleanKey,
            value: value,
            type: typeof value
          });
        }
      });

      console.log('📤 Preparing API Request to server-filtered-workers', {
        filterCount: Object.keys(cleanedFilters).length,
        hasLatLong: !!(cleanedFilters.lat && cleanedFilters.long),
        hasCity: !!cleanedFilters.city_id,
        hasCategory: !!cleanedFilters.category_id,
        platform: Platform.OS
      });

      // Make the request
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/server-filtered-workers`,
        timeout: 15000, // Increased timeout
        params: cleanedFilters,
        paramsSerializer: function(params) {
          return Object.keys(params)
            .map(key => {
              const value = params[key];
              const encodedKey = encodeURIComponent(key);
              const encodedValue = encodeURIComponent(value);
              return `${encodedKey}=${encodedValue}`;
            })
            .join('&');
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `Ajurapp-Mobile/${Platform.OS}`
        }
      });

      console.log('✅ API Request Successful:', {
        status: response.status,
        statusText: response.statusText,
        workersCount: response.data.workers?.length || 0,
        hasPagination: !!response.data.pagination,
        message: response.data.message || 'No message'
      });

      // Show alert only in development for no results
      if (__DEV__ && response.data.workers?.length === 0 && Object.keys(filters).length > 2) {
        console.log('⚠️ No results with filters:', cleanedFilters);
      }
      
      return response.data;

    } catch (error) {
      // More detailed error analysis
      let errorType = 'Unknown';
      let errorDetails = {};
      
      if (error.code === 'ECONNABORTED') {
        errorType = 'Timeout';
        errorDetails = { code: error.code, timeout: error.config?.timeout };
      } else if (error.message?.includes('Network Error')) {
        errorType = 'Network';
        errorDetails = { isNetworkError: true };
      } else if (error.response) {
        errorType = 'Server Response';
        errorDetails = {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        };
      } else if (error.request) {
        errorType = 'No Response';
        errorDetails = { requestMade: true };
      }
      
      console.error('🚨 filterApi Error Details:', {
        errorType,
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
          params: error.config?.params
        },
        ...errorDetails
      });

      // Only show alert for critical errors in production
      if (__DEV__ || errorType === 'Network' || error.response?.status >= 500) {
        Alert.alert(
          'خطا در دریافت اطلاعات',
          `نوع خطا: ${errorType}\n` +
          `پیام: ${error.message || 'خطای ناشناخته'}\n` +
          `کد: ${error.response?.status || 'بدون پاسخ'}`,
          [{ text: 'باشه', style: 'cancel' }]
        );
      }
      
      // Return empty response structure that matches API response
      return {
        workers: [],
        pagination: {
          current_page: 1,
          total_pages: 0,
          total_count: 0,
          has_next: false,
          per_page: 10
        },
        status: error.response?.status || 500,
        message: `خطا: ${errorType} - ${error.message || 'خطای ناشناخته'}`,
        error: errorType
      };
    }
  }
};

export default filterApi;