'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserTable } from '@/components/users/UserTable';
import { Pagination } from '@/components/users/Pagination';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { mockUsers } from '@/lib/mockData';
import { PAGINATION } from '@/lib/constants';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return mockUsers;
    
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Sort users by registration date (latest first)
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => 
      new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
    );
  }, [filteredUsers]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedUsers.slice(startIndex, endIndex);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col space-y-4">
        {/* Page Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">登録ユーザー一覧</h1>
          </div>
          <div className="w-full sm:w-80">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="ニックネーム、メールアドレスで検索..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

          </div>
        </div>



        {/* User Table - Takes remaining space */}
        {paginatedUsers.length > 0 ? (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <UserTable users={paginatedUsers} />
            </div>

            {/* Pagination - Always visible at bottom */}
            {totalPages > 1 && (
              <div className="flex-shrink-0 mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={sortedUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ユーザーが見つかりません
              </h3>
              <p className="text-gray-600">
                検索条件を変更して再度お試しください。
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
